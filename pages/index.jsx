import styles from "../styles/Home.module.css";
import BabylonScene from "../components/BabylonScene";
import { memo, useEffect, useState } from "react";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import Loading from "../components/Loading";
import { BottomBar } from "../components/BottomBar";
import { Tabs } from "../components/Tabs";
import ControlContainer from "../components/ControlContainer";
import { Button } from "antd";
import { SettingsRounded } from "@mui/icons-material";
import { ClothingModal } from "../components/ClothingModal";
import constants from "../components/utils/Constants";
function getWindowDimensions() {
  if (typeof window == "undefined") return { width: 0, height: 0 };
  return {
    width: window?.innerWidth,
    height: window?.innerHeight,
  };
}

const Home = () => {
  const [
    { loading, size,initialSkinLoading, shouldShowBrowseButton, windowSize, activePreviewItem, selectedClothe },
    dispatch,
  ] = useStateProviderValue();
  const [clothingModalOpen, setClothingModalOpen] = useState(false);

  useEffect(() => {
    function handleResize() {
      let dimensions = getWindowDimensions();
      if (dimensions.width === 0 || dimensions.height === 0) return;
      dispatch({
        type: "SET_WINDOW_SIZE",
        windowSize: dimensions,
      });
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  const hasAnyClothes =
    Object.entries(selectedClothe ?? {}).filter(
      ([key, value]) => key !== "Hairstyles" && value != null
    ).length > 0 && windowSize.width < 1000;

  const toggleActivePreviewItem = (item) => {
    if (
      `${activePreviewItem?.id}${activePreviewItem?.displayName}` ===
      `${item?.id}${item?.displayName}`
    ) {
      dispatch({
        type: "SET_ACTIVE_PREVIEW_ITEM",
        activePreviewItem: null,
      });
      return;
    }
    dispatch({
      type: "SET_ACTIVE_PREVIEW_ITEM",
      activePreviewItem: item,
    });
  };

  return (
    <Loading open={loading| initialSkinLoading}>
      <main className={styles.main}>
        <div className={styles.dashboardContainer}>
          {/* <NavBar /> */}
          <div className={styles.viewerContainer}>
            <div className={styles.tabs}>
              <Tabs />
            </div>
            <div className={styles.workArea}>
              {clothingModalOpen && (
                <div className={styles.clothingModalOverlay}>
                  <ClothingModal onClose={() => setClothingModalOpen(false)} />
                </div>
              )}

              <div
                className={[
                  styles.bottomButtonContainer,
                  shouldShowBrowseButton && styles.visible,
                ].join(" ")}
              >
                {hasAnyClothes ? (
                  <div className={styles.summary}>
                    <div className={styles.summaryContainer}>
                      <div className={styles.summaryItems}>
                        {Object.entries(selectedClothe)
                          .filter(
                            ([key, value]) =>
                              key !== "Hairstyles" && value != null
                          )
                          .map(([key, item]) => (
                            <div
                              key={key}
                              className={styles.summaryItem}
                              onClick={() => {
                                //TODO: FIXA
                                toggleActivePreviewItem({...item, section: key});
                              }}
                            >
                              <img
                                src={
                                  [
                                    constants.storageBaseUrl,
                                    "clothing",
                                    key.toLowerCase(),
                                    `${item?.id}.jpg`,
                                  ].join("%2F") + "?alt=media"
                                }
                                alt={item?.name}
                                width={30}
                                className={styles.summaryImage}
                              />
                              <span className={styles.summaryText}>
                                {item?.name}
                              </span>
                            </div>
                          ))}
                      </div>
                      <Button
                        size="small"
                        shape="round"
                        style={{
                          padding: 15,
                          paddingLeft: 10,
                          paddingRight: 10,
                          fontSize: 12,
                        }}
                        color="default"
                        variant="solid"
                        iconPosition="start"
                        icon={<SettingsRounded fontSize="inherit" />}
                        onClick={() => {
                          setClothingModalOpen(true);
                        }}
                      >
                        <p className={styles.buttonLabel}>Select Outfits</p>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button
                    size="medium"
                    shape="round"
                    style={{ padding: 20, paddingLeft: 10, paddingRight: 15 }}
                    color="default"
                    variant="solid"
                    iconPosition="start"
                    icon={<SettingsRounded />}
                    onClick={() => {
                      setClothingModalOpen(true);
                    }}
                  >
                    <p className={styles.buttonLabel}>Select Outfits</p>
                  </Button>
                )}
              </div>

              <div className={styles.viewerArea}>
                <BabylonScene size={size} key={size} />
              </div>
              <div className={styles.controlArea}>
                <ControlContainer />
              </div>
            </div>
          </div>

          <BottomBar />
        </div>
      </main>
    </Loading>
  );
};

export default memo(Home);
