// moveActiveCamera.js
import constants from "./Constants";
import createAnimation from "./createAnimation";
import { Scalar } from "@babylonjs/core/Maths/math.scalar";

export const CamComeBack = (camera, targetY) => {
  /* -----------------------------------------------------------
     Zoom limits (what you told me)
  ----------------------------------------------------------- */
  const minR = 1.5; // tightest users may zoom
  const maxR = 4; // widest users may zoom

  /* -----------------------------------------------------------
     Observer — make sure only *one* is active
  ----------------------------------------------------------- */
  if (camera.__liftObserver) {
    camera.onAfterCheckInputsObservable.remove(camera.__liftObserver);
  }

  camera.__liftObserver = camera.onAfterCheckInputsObservable.add((camera) => {
    // normalise 0-1 between 1.5 and 4.0
    const t = Scalar.Clamp((camera.radius - minR) / (maxR - minR), 0, 1);
    const homeTarget = constants.viewPortCoords.home.target;
    camera.targetScreenOffset.y = -t * (homeTarget.y - targetY);
  });
};

/**
 * Jump-zoom to a close-up pose, then let the picture slide back down
 * as the user scrolls out.  Works with an ArcRotateCamera whose
 * radius is clamped to 1.5 – 4.0.
 *
 * @param {BABYLON.Scene} scene
 * @param {{ radius:number, alpha:number, beta:number }} pose  close-up values
 */
export default function moveActiveCamera(
  scene,
  { radius, alpha, beta, target , offsetY = 0 }
) {
  const camera = scene.activeCamera;
  if (!camera) return; // safety
  if (camera.__liftObserver) {
    camera.onAfterCheckInputsObservable.remove(camera.__liftObserver);
  }
    /* -----------------------------------------------------------
     Animate radius / alpha / beta and the picture-lift
  ----------------------------------------------------------- */
  camera.animations = [
    
    createAnimation({
      property: "radius",
      from: camera.radius,
      to: radius,
    }),
    createAnimation({
      property: "targetScreenOffset.y",
      from: camera.targetScreenOffset.y,
      to: 0,
    }),
    createAnimation({
      property: "beta",
      from: camera.beta,
      to: beta,
    }),
    createAnimation({
      property: "alpha",
      from: camera.alpha,
      to: alpha,
    }),
    createAnimation({
      property: "target.x",
      from: camera.target.x,
      to: target.x,
    }),
    createAnimation({
      property: "target.y",
      from: camera.target.y,
      to: target.y,
    }),
    createAnimation({
      property: "target.z",
      from: camera.target.z,
      to: target.z,
    }),
  ];

  const anim = scene.beginAnimation(camera, 0, 100, false, 4, () => {
    CamComeBack(camera, target.y);
  }); // ≈0.33 s
}
