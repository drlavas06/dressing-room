/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import styles from "./ControlContainer.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import SkinColorSelector from "./SkinColorSelector";
import HairStyleSelector from "./HairStyleSelector";
import {
  Cancel,
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from "@mui/icons-material";
import BodySizeSelector from "./BodySizeSelector";
import FaceSwapSelector from "./FaceSwapSelector";
import ClothingSelector from "./ClothingSelector";
import constants from "./utils/Constants";

const ComponentMap = {
  skinColor: {
    title: "Skin Color",
    hasResetButton: true,
    component: <SkinColorSelector />,
    camPose: "skinColorSelector",
  },
  hairstyle: {
    title: "Hairstyle",
    hasResetButton: true,
    component: <HairStyleSelector />,
    camPose: "hairstyleSelector",
    smallCamPose: "hairstyleSelectorSmall",
  },
  bodyProportions: {
    title: "Body Proportions",
    hasResetButton: true,
    component: <BodySizeSelector />,
    camPose: "bodyProportionsSelector",
  },
  faceSwap: {
    title: "Face Swap",
    hasResetButton: true,
    component: <FaceSwapSelector />,
    camPose: "faceSwapSelector",
  },
  clothes: {
    title: "Clothes",
    customContainer: true,
    hasResetButton: false,
    Container: (children) => (
      <div className={styles.clothingContainer}>{children}</div>
    ),
    component: (props) => <ClothingSelector {...props} />,
    camPose: "clothesSelector",
  },
};

function ControlContainer() {
  const [
    { activeController, selectedClothe, windowSize, activePreviewItem },
    dispatch,
  ] = useStateProviderValue();
  const setActivePreviewItem = (item) => {
    dispatch({
      type: "SET_ACTIVE_PREVIEW_ITEM",
      activePreviewItem: item,
    });
  };
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (!ComponentMap[activeController]?.camPose) return;
    dispatch({
      type: "SET_VIEWPORT",
      viewPort:
        windowSize.width < 1000 &&
        ComponentMap[activeController].smallCamPose != null
          ? ComponentMap[activeController].smallCamPose
          : ComponentMap[activeController].camPose,
    });
    if (activeController === "clothes") {
      dispatch({
        type: "SET_SHOULD_SHOW_BROWSE_BUTTON",
        shouldShowBrowseButton: true,
      });
    } else {
      dispatch({
        type: "SET_SHOULD_SHOW_BROWSE_BUTTON",
        shouldShowBrowseButton: false,
      });
    }
  }, [activeController]);

  const toggleCollapse = () => {
    setCollapsed((prev) => !prev);
  };

  const toggleActivePreviewItem = (item) => {
    if (
      `${activePreviewItem?.id}${activePreviewItem?.displayName}` ===
      `${item?.id}${item?.displayName}`
    ) {
      setActivePreviewItem(null);
      return;
    }
    setActivePreviewItem(item);
  };
  const removeClothe = (section) => {
    dispatch({
      type: "SET_SELECTION",
      key: section,
      value: null,
    });
  };

  return (
    <div
      className={[
        styles.ControlContainer,
        collapsed ? styles.collapsed : "",
      ].join(" ")}
    >
      {ComponentMap[activeController]?.customContainer == null ? (
        <div className={styles.controlBox}>
          <div
            onClick={toggleCollapse}
            className={[
              styles.titleContainer,
              !ComponentMap[activeController]?.hasResetButton &&
                styles.centerTitle,
            ].join(" ")}
          >
            <h2 className={styles.title}>
              {ComponentMap[activeController]?.title}
            </h2>
            {windowSize.width < 1000 && (
              <>
                {collapsed ? (
                  <KeyboardArrowUpRounded
                    className={styles.visibleOnSmallScreen}
                    fontSize="small"
                  />
                ) : (
                  <KeyboardArrowDownRounded
                    className={styles.visibleOnSmallScreen}
                    fontSize="small"
                  />
                )}
              </>
            )}
          </div>
          {ComponentMap[activeController]?.component}
        </div>
      ) : (
        ComponentMap[activeController]?.Container(
          <>
            {activePreviewItem != null && (
              <div className={styles.controlBox}>
                {ComponentMap[activeController].component(activePreviewItem)}
              </div>
            )}

            <div className={styles.selectedClothingPreview}>
              <div className={styles.summaryItems}>
                {Object.entries(selectedClothe)
                  .filter(
                    ([key, value]) => key !== "Hairstyles" && value != null
                  )
                  .map(([key, item]) => (
                    <>
                      <div key={key} className={styles.summaryItem}>
                        {key != "Shoes" && (
                          <div
                            className={styles.summaryItemClose}
                            onClick={() => {
                              removeClothe(key);
                              setActivePreviewItem(null);
                            }}
                          >
                            <Cancel fontSize="small" />
                          </div>
                        )}

                        <img
                          src={
                            [
                              constants.storageBaseUrl,
                              "clothing",
                              key.toLowerCase(),
                              `${item?.id}.jpg`,
                            ].join("%2F") + "?alt=media"
                          }
                          onClick={() => {
                            toggleActivePreviewItem({ ...item, section: key });
                          }}
                          alt={item?.name}
                          width={60}
                          className={styles.summaryImage}
                        />
                        <span className={styles.summaryText}>{item?.name}</span>
                      </div>
                    </>
                  ))}
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default ControlContainer;
