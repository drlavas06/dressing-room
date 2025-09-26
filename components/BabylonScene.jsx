import React, { memo, useEffect, useRef, useState } from "react";
import { Engine, Scene, SceneLoader } from "babylonjs";
import * as BABYLON from "babylonjs"; // for additional BABYLON classes
import "babylonjs-loaders";
import styles from "./scene.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import moveActiveCamera, { CamComeBack } from "./utils/moveCam";
import constants from "./utils/Constants";
import { skinTextureMap } from "./utils/Constants";
import createAnimation from "./utils/createAnimation";
import { Button } from "antd/es/radio";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
const SCREENSHOT_MULTIPLIER = 10;
const BabylonScene = ({ size }) => {
  const reactCanvas = useRef(null);
  const sceneRef = useRef(null);
  const engineRef = useRef(null); // Use a ref for the engine
  const pointerActiveRef = useRef(false);
  const [mountedClothingItems, setMountedClothingItems] = useState({});
  const [scrollButtonVisible, setScrollButtonVisible] = useState(false);
  const [
    {
      modelProp,
      viewPort,
      snapShot,
      downloadTo,
      freezeViewPort,
      skinColor,
      hairColor,
      selectedClothe,
      mouseAction,
      windowSize,
      skinLoading,
    },
    dispatch,
  ] = useStateProviderValue();

  // Utility functions and scene operations (same as before)
  const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

  /*const getMainModelUrl = () =>
    `${constants.storageBaseUrl}%2F${size}.glb?alt=media`;*/


  const getMainModelUrl = () =>
    `${constants.storageBaseUrl}%2Fcombined.glb?alt=media`;

  const getClothingUrl = (section, id, path = null) => {
    if (section === "Hairstyles") {
      return (
        [
          constants.storageBaseUrl,
          "clothing",
          section.toLowerCase(),
          `${id}.glb`,
        ].join("%2F") + "?alt=media"
      );
    }

    return (
      [
        constants.storageBaseUrl,
        "clothing",
        section.toLowerCase(),
        path ? path : `${size}_${id}.glb`,
      ].join("%2F") + "?alt=media"
    );
  };

  /*const getTextureUrl = (to) =>
    `${constants.storageBaseUrl}%2Fcombined-textures%2F${to.value}.glb?alt=media`;
  */

  const getTextureUrl = (to) => {
    const filename = skinTextureMap[to.value]; 
    return `${constants.storageBaseUrl}%2Fcombined-textures%2F${filename}?alt=media`;
  };

  const loadMesh = (url, onSuccess, onError) => {
    SceneLoader.ImportMesh(
      "",
      "",
      url,
      sceneRef.current,
      onSuccess,
      undefined,
      onError
    );
  };

  const loadMainModel = () => {
    const url = getMainModelUrl();
    loadMesh(
      url,
      (meshes) => {
        dispatch({ type: "SET_LOADING", loading: false });
        // Apply the skin texture immediately after loading the model.
        updateSkinColor(skinColor, "character");

        /*if (meshes[0]?.material) {
          const mat = meshes[0].material;

          // === OPTIONAL SKIN TWEAKS ===
          mat.metallic = 0.0;     // skin shouldn’t look metallic
          mat.roughness = 0.6;    // softer reflections

          // Enable subsurface scattering
          mat.subSurface.isTranslucencyEnabled = true;
          mat.subSurface.translucencyIntensity = 0.35; // tweak between 0.2–0.5
          mat.subSurface.tintColor = new BABYLON.Color3(1.0, 0.75, 0.65); // warm skin tone
          mat.subSurface.minimumThickness = 0.2;
          mat.subSurface.maximumThickness = 1.0;
          sceneRef.current.debugLayer.select(meshes[0].material, "SUBSURFACE");
        }*/

        if (modelProp) {
          Object.entries(modelProp).forEach(([area, value]) => {
            modifyMorphTargets(Math.abs(value), capitalize(area));
          });
        }
      },
      () => {}
    );

    sceneRef.current.defaultCursor = "grab";
    sceneRef.current.useRightHandedSystem = true;
  };

  const modifyMorphTargets = (value, modifier) => {
    if (!sceneRef.current) return;
    sceneRef.current.meshes.forEach((mesh) => {
      try {
        const morphTarget = mesh?.morphTargetManager?._targets?.find((e) =>
          e.name.toLowerCase().includes(modifier.toLowerCase())
        );
        if (morphTarget) {
          morphTarget.influence = value / 100;
        }
      } catch (e) {}
    });
  };

  const adjustHairPosition = (value) => {
    if (!sceneRef.current) return;
    const hairMeshes = sceneRef.current.meshes.filter(
      (mesh) => mesh.id === "__root__" && mesh.name.includes("hair")
    );
    hairMeshes.forEach((mesh) => {
      mesh.position.y = 0.135 * (value / 100);
    });
  };

  const mountClothing = (
    section,
    id,
    callback = () => {},
    modelProperties,
    setLoading = () => {},
    path
  ) => {
    const url = getClothingUrl(section, id, path);
    setLoading(true);
    loadMesh(
      url,
      (meshes) => {
        setLoading(false);
        if (section === "Hairstyles" && meshes[0]) {
          meshes[0].name += "_hair";
        }
        setMountedClothingItems((prev) => ({
          ...prev,
          [section]: { id, meshes },
        }));
        if (modelProperties) {
          if (section === "Hairstyles") {
            adjustHairPosition(modelProperties.height);
          }
          Object.entries(modelProperties).forEach(([area, value]) => {
            modifyMorphTargets(Math.abs(value), capitalize(area));
          });
        }
        callback();
      },
      () => {
        setLoading(false);
      }
    );
  };

  const unmountClothing = (section) => {
    if (!sceneRef.current || !mountedClothingItems[section]) return;
    setMountedClothingItems((prev) => {
      const newState = { ...prev };
      delete newState[section];
      return newState;
    });
    mountedClothingItems[section].meshes.forEach((mesh) => mesh.dispose());
  };

  const updateSkinColor = (to, modifier) => {
    if (!sceneRef.current) return;
    /*const targetMeshes = sceneRef.current.meshes.filter((mesh) =>
      mesh.id.includes(modifier)
    );*/

    /*Denys: Filter meshes for body and face only.*/
    const targetMeshes = sceneRef.current.meshes.filter(
      (mesh) =>
      mesh.name === "M_mannequin_primitive0" || // body
      mesh.name === "M_mannequin_primitive1"    // face
    );

    if (!targetMeshes.length) return;
    const url = getTextureUrl(to);
    loadMesh(url, (textureMeshes) => {
      textureMeshes.forEach((textureMesh) => {
        if (textureMesh.material && textureMesh.material.albedoTexture) {

          const albedo = textureMesh.material.albedoTexture; //only use albedo map since other maps are the same for 11 skin texture materials
          targetMeshes.forEach((mesh) => {

            if(mesh.name === textureMesh.name ) {
              //mesh.material = textureMesh.material;
              const mat = mesh.material;

              // Apply subsurface scattering for skin realism
              mat.metallic = 0.0;     // no metallic look
              mat.roughness = 1;    // softer highlights
              mat.subSurface.isTranslucencyEnabled = true;
              mat.subSurface.translucencyIntensity = 0.35;  // tweak 0.2–0.5
              mat.subSurface.tintColor = new BABYLON.Color3(1.0, 0.75, 0.65); // warm tone
              mat.subSurface.minimumThickness = 0.1;
              mat.subSurface.maximumThickness = 1.0;

              // Apply only base color texture
              mat.albedoTexture = albedo;

            }

          });
        }
        textureMesh.dispose();
      });
      dispatch({ type: "SET_SKIN_LOADING", skinLoading: false });
      dispatch({ type: "SET_SKIN_LOADED" });

    });
  };

  const loadLightsConfiguration = () => {
    // const lightsUrl = `${constants.storageBaseUrl}%2Flights.glb?alt=media`;
    
    // loadMesh(
    //   lightsUrl,
    //   (meshes) => {
    //     console.log("Lights configuration loaded successfully");
    //     // The lights from the GLB file are now part of the scene
    //     // Any light configurations in the GLB will be automatically applied
    //   },
    //   (error) => {
    //     console.error("Failed to load lights configuration:", error);
    //   }
    // );
    const lightA = new BABYLON.HemisphericLight("lightA", new BABYLON.Vector3(-4, 0, -4), scene);
    lightA.intensity = 0.5;
    const lightB = new BABYLON.HemisphericLight("lightB", new BABYLON.Vector3(4, 0, -3), scene);
    lightB.intensity = 1.0;
  };

const initializeScene = () => {
  if (!reactCanvas.current) return;
  const eng = new Engine(reactCanvas.current, true);
  engineRef.current = eng;
  const scene = new Scene(eng);
  sceneRef.current = scene;

  scene.enablePrePassRenderer();

  // Debug toggle (Alt+D)
  const debugPopup = () => {
    scene.debugLayer.show({ embedMode: false, overlay: false, showExplorer: true, showInspector: true, handleResize: true });
  };
  window.addEventListener("keydown", (ev) => {
    if (ev.altKey && ev.code === "KeyD") {
      scene.debugLayer.isVisible() ? scene.debugLayer.hide() : debugPopup();
    }
  });

  /*
  const hdrTexture = new BABYLON.HDRCubeTexture(
    `${constants.storageBaseUrl}%2Fenv.hdr?alt=media`,
    scene,
    1024
  );

  // Keep your ground/skybox, but make sure the scene gets an envTexture
  scene.createDefaultEnvironment({
    createGround: false,
    createSkybox: true,
    enableEnvironmentTexture: false, // we’ll set it explicitly next line
  });
  scene.environmentTexture = hdrTexture;*/
  
  
  // Optional: gamma correction (helps with skin tones)
  scene.imageProcessingConfiguration.applyByPostProcess = true;
  scene.imageProcessingConfiguration.toneMappingEnabled = true;
  scene.imageProcessingConfiguration.toneMappingType = BABYLON.ImageProcessingConfiguration.TONEMAPPING_ACES;
  scene.imageProcessingConfiguration.exposure = 1.0;
  scene.imageProcessingConfiguration.contrast = 1.00;
  

  
  const hdrTex = BABYLON.CubeTexture.CreateFromPrefilteredData(
    "https://assets.babylonjs.com/environments/sanGiuseppeBridge.env", //.env only. Not .hdr
    scene
  );
  scene.environmentTexture = hdrTex;

  // Автоматическое окружение
  const skybox = scene.createDefaultSkybox(hdrTex, true, 1000, 1);

  // Access the skybox material and set properties
  const skyboxMaterial = skybox.material;

	// Set the micro-surface (roughness)
	skyboxMaterial.microSurface = 0.7; // Adjust the value (0 to 1) as needed
  

  if (scene.environmentTexture && "rotationY" in scene.environmentTexture) {
    scene.environmentTexture.rotationY = Math.PI;
  }

  // QUICK LIGHTS (delete if you switch to Append-based lights.glb)
  /*const lightA = new BABYLON.HemisphericLight("lightA", new BABYLON.Vector3(-4, 0, -4), scene);
  lightA.intensity = 0.5;
  const lightB = new BABYLON.HemisphericLight("lightB", new BABYLON.Vector3(4, 0, -3), scene);
  lightB.intensity = 1.0;*/
  const key = new BABYLON.DirectionalLight("key", new BABYLON.Vector3(-1, -2, -1), scene);
  key.intensity = 2;

  const fill = new BABYLON.DirectionalLight("fill", new BABYLON.Vector3(1, -1, -1), scene);
  fill.intensity = 1;

  const rim = new BABYLON.DirectionalLight("rim", new BABYLON.Vector3(0, -1, 1), scene);
  rim.intensity = 1.5;

  // Or, if you really want to load from GLB:
  // BABYLON.SceneLoader.Append("", `${constants.storageBaseUrl}%2Flights.glb?alt=media`, scene);

  // Camera
  const camera = new BABYLON.ArcRotateCamera("camera1", 1, 0, 1, new BABYLON.Vector3(-1, 0, 3), scene);
  camera.setTarget(new BABYLON.Vector3(0, 1, 0));
  camera.attachControl(reactCanvas.current, false, false);
  camera.speed = 0.3;
  camera.lowerRadiusLimit = 1.5;
  camera.upperRadiusLimit = 4;
  camera.upperBetaLimit = 1.8;
  camera.lowerBetaLimit = 1.1;
  camera.inputs.attached.pointers.multiTouchPanAndZoom = false;
  camera.inputs.attached.pointers.multiTouchPanning = false;
  camera.pinchToPanMaxDistance = 0;
  camera.fov = 0.5;
  camera.inputs.attached.pointers.buttons = [0];
  camera.onViewMatrixChangedObservable.add(() => {
    // Check if camera is zoomed in (radius is less than max)
    const isZoomedIn = camera.radius < camera.upperRadiusLimit * 0.4;
    setScrollButtonVisible(isZoomedIn);
  });
  scene.clearColor = new BABYLON.Color3(1, 1, 1);



  scene.textures.forEach((t) => (t.anisotropicFilteringLevel = 16));
  // for safety, touch PBR material maps explicitly too:
  /*scene.materials.forEach((m) => {
    const p = m ;
    if (p && p.getClassName && p.getClassName() === "PBRMaterial") {
      [
        p.albedoTexture, p.metallicTexture, p.ambientTexture,
        p.bumpTexture, p.normalTexture, p.emissiveTexture,
        p.opacityTexture, p.reflectionTexture, p.refractionTexture
      ].forEach((tex) => { if (tex) tex.anisotropicFilteringLevel = 16; });
    }
  });*/

  loadMainModel();
};

  // === EFFECTS ===

  useEffect(() => {
    if (sceneRef.current) {
      sceneRef.current.getEngine().resize();
      sceneRef.current.clearColor =
        windowSize.width > 1000
          ? new BABYLON.Color3(1, 1, 1)
          : new BABYLON.Color3(0.956, 0.956, 0.956);
    }
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    if (!sceneRef.current || !sceneRef.current.activeCamera) return;
    let observer;
    if (mouseAction === "pan") {
      sceneRef.current.defaultCursor = "ns-resize";
      sceneRef.current.cameras[0].inputs.attached.pointers.detachControl();
      observer = sceneRef.current.onPointerObservable.add((eventData) => {
        if (eventData.type === BABYLON.PointerEventTypes.POINTERDOWN) {
          pointerActiveRef.current = true;
        } else if (eventData.type === BABYLON.PointerEventTypes.POINTERUP) {
          pointerActiveRef.current = false;
        } else if (
          pointerActiveRef.current &&
          eventData.type === BABYLON.PointerEventTypes.POINTERMOVE
        ) {
          const evt = eventData.event;
          const movementVector = new BABYLON.Vector3(0, evt.movementY / 500, 0);
          sceneRef.current.cameras[0].position.addInPlace(movementVector);
          sceneRef.current.cameras[0].target.addInPlace(movementVector);
        }
      });
    } else {
      sceneRef.current.defaultCursor = "grab";
      sceneRef.current.cameras[0].inputs.attachInput(
        sceneRef.current.cameras[0].inputs.attached.pointers
      );
    }
    return () => {
      if (observer) {
        sceneRef.current.onPointerObservable.remove(observer);
      }
    };
  }, [mouseAction]);

  useEffect(() => {
    modifyMorphTargets(modelProp.breast, "breasts");
  }, [modelProp.breast]);

  useEffect(() => {
    modifyMorphTargets(modelProp.heel, "heel");
  }, [modelProp.heel]);

  useEffect(() => {
    modifyMorphTargets(modelProp.waist, "waist");
  }, [modelProp.waist]);

  useEffect(() => {
    modifyMorphTargets(modelProp.hip, "hip");
  }, [modelProp.hip]);

  useEffect(() => {
    modifyMorphTargets(Math.abs(modelProp.height), "height");
    adjustHairPosition(modelProp.height);
  }, [modelProp.height]);

  useEffect(() => {
    updateSkinColor(skinColor, "character");
  }, [skinColor]);

  // Initialize the engine and scene only once when the canvas is ready.
  useEffect(() => {
    if (!reactCanvas.current) return;
    initializeScene();
    const eng = engineRef.current;
    if (eng) {
      eng.runRenderLoop(() => {
        if (sceneRef.current) {
          sceneRef.current.render();
        }
      });
      eng.setHardwareScalingLevel(0.2);
      // Clean up on unmount.
      return () => {
        eng.dispose();
      };
    }
  }, [reactCanvas, freezeViewPort]);

  useEffect(() => {
    unmountClothing("Tops");
    if (selectedClothe.Tops) {
      mountClothing("Tops", selectedClothe.Tops.id, undefined, modelProp);
    }
  }, [selectedClothe.Tops]);

  useEffect(() => {
    unmountClothing("Shoes");
    if (selectedClothe.Shoes) {
      mountClothing(
        "Shoes",
        selectedClothe.Shoes.id,
        undefined,
        modelProp,
        () => {},
        `${size}_${selectedClothe.Shoes.id}_${skinColor.value}.glb`
      );
    }
  }, [size, selectedClothe.Shoes, skinColor]);

  useEffect(() => {
    if (selectedClothe.Hairstyles) {
      const previousHair = mountedClothingItems["Hairstyles"];
      mountClothing(
        "Hairstyles",
        `${selectedClothe.Hairstyles.id}_${hairColor.path}`,
        () => {
          previousHair.meshes.forEach((mesh) => mesh.dispose());
        },
        modelProp,
        (value) => {
          dispatch({ type: "SET_HAIR_LOADING", hairLoading: value });
        }
      );
    }
  }, [selectedClothe.Hairstyles, hairColor.path]);

  useEffect(() => {
    if (!sceneRef.current || !viewPort || !sceneRef.current.activeCamera)
      return;
    const setup = constants.viewPortCoords[viewPort];
    moveActiveCamera(sceneRef.current, setup);
  }, [viewPort]);

  useEffect(() => {
    if (
      !sceneRef.current ||
      !sceneRef.current.activeCamera ||
      !engineRef.current
    )
      return;
    const boundingHeight = reactCanvas.current.offsetHeight;
    const boundingWidth = reactCanvas.current.offsetWidth;
    BABYLON.Tools.CreateScreenshotUsingRenderTarget(
      engineRef.current,
      sceneRef.current.activeCamera,
      {
        width: boundingWidth * SCREENSHOT_MULTIPLIER,
        height: boundingHeight * SCREENSHOT_MULTIPLIER,
      },
      downloadTo === "local"
        ? undefined
        : (data) => {
            dispatch({ type: "SET_BG", bg: data });
          },
      undefined,
      undefined,
      true
    );
  }, [snapShot, downloadTo]);

  const moveVerticalCamera = (direction) => {
    if (!sceneRef.current || !sceneRef.current.activeCamera) return;
    const camera = sceneRef.current.activeCamera;
    const delta = direction === "up" ? 0.1 : -0.1;
    if (
      (direction === "up" && camera.target.y > 1.5) ||
      (direction === "down" && camera.target.y < 0.3)
    )
      return;

    camera.animations = [
      createAnimation({
        property: "target.y",
        from: camera.target.y,
        to: camera.target.y + delta,
      }),
    ];
    console.log(
      `Moving camera ${direction} by ${delta}. Current: ${camera.animations}`
    );
    sceneRef.current.beginAnimation(camera, 0, 100, false, 5, () => {
      CamComeBack(camera, camera.target.y);
    });
  };

  return (
    <div className={styles.workArea}>
      <div className={styles.viewArea}>
        <div className={styles.overlayContainer}>
          <div
            className={[
              styles.scrollButtons,
              !scrollButtonVisible ? styles.hiddenScrollButtons : "",
            ].join(" ")}
          >
            <div
              className={styles.scrollButton}
              onClick={() => moveVerticalCamera("up")}
            >
              <ExpandLessRounded />
            </div>
            <div
              className={styles.scrollButton}
              onClick={() => moveVerticalCamera("down")}
            >
              <ExpandMoreRounded />
            </div>
          </div>
        </div>
        <canvas style={{ width: "100%", height: "100%" }} ref={reactCanvas} />
        <div className={[styles.loadingBlurContainer, skinLoading? styles.loadingBlur: ""].join(" ")} >
          <div className={[styles.loaderContainer, skinLoading? styles.loadingvisible: ""].join(" ")}>

          <div className={styles.loader}> </div>
            { "Loading skin..."}
            </div>
        </div>
          
      </div>
    </div>
  );
};

export default memo(BabylonScene);
