/* eslint-disable @next/next/no-img-element */
import styles from "./ClothingSelector.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { Icon } from "@mui/material";
import {
  CachedRounded,
  KeyboardArrowDownRounded,
  OpenInNewRounded,
} from "@mui/icons-material";
import CarouselItem from "./CarouselItem";
import HairColorSelector from "./HairColorSelector";
import constants, { clothing } from "./utils/Constants";
import { Button } from "antd";

export default function ClothingSelector(item) {
  const [{ activePreviewItem, windowSize }, dispatch] = useStateProviderValue();

  return (
    <div className={styles.container}>
      <div className={styles.clothingContainer}>
        <div className={styles.clothingSelector}>
          <div
            className={styles.clothingTitle}
            onClick={() => {
              if (windowSize.width < 1000) {
                dispatch({
                  type: "SET_ACTIVE_PREVIEW_ITEM",
                  activePreviewItem: null,
                });
              }
            }}
          >
            <span>{item.displayName}</span>
            <KeyboardArrowDownRounded
              className={[styles.visibleOnSmallScreen, styles.collapseIcon].join(" ")}
              fontSize="small"
            />
          </div>
          <div className={styles.description}>
            <span>{item.description}</span>
          </div>
          <img
            src={
              [
                constants.storageBaseUrl,
                "clothing",
                item.section.toLowerCase(),
                `${item?.id}.jpg`,
              ].join("%2F") + "?alt=media"
            }
            alt={item?.name}
            className={styles.summaryImage}
          />
          {item?.url && (
            <div className={styles.link}>
              <Button
                color="default"
                variant="text"
                target="_blank"
                shape="round"
                href={item.url}
              >
                <OpenInNewRounded fontSize="small" />
                <span>Open in new tab</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
