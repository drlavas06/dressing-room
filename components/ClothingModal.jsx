"use client";
import React, { useState } from "react";
import styles from "./ClothingModal.module.css";
import { Button } from "antd";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import {
  Cancel,
  ChevronLeftRounded,
  KeyboardArrowLeftRounded,
} from "@mui/icons-material";
import { ClothingNavBar } from "./ClothingNavBar";
import constants, { clothing } from "./utils/Constants";
import ClothingItem from "./ClothingItem";

const chunkArray = (arr, chunkSize=4) => {
  const chunkedArray = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunkedArray.push(arr.slice(i, i + chunkSize));
  }
  return chunkedArray;
};
export const ClothingModal = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState(
    clothing.clothingSections[0].value
  );
  const [{ selectedClothe, windowSize }, dispatch] = useStateProviderValue();
  const removeClothe = (section) => {
    dispatch({
      type: "SET_SELECTION",
      key: section,
      value: null,
    });
  };

  const hasAnyClothes =
    Object.entries(selectedClothe ?? {}).filter(
      ([key, value]) => key !== "Hairstyles" && value != null
    ).length > 0;
  return (
    <div className={styles.container}>
      {hasAnyClothes && (
        <div className={styles.summary}>
          <div className={styles.summaryContainer}>
            <div className={styles.summaryItems}>
              {Object.entries(selectedClothe)
                .filter(([key, value]) => key !== "Hairstyles" && value != null)
                .map(([key, item]) => (
                  <div
                    key={key}
                    className={styles.summaryItem}
                    onClick={() => {
                      if (key !== "Shoes") {
                        removeClothe(key);
                      }
                    }}
                  >
                    {key !== "Shoes" && (
                      <Cancel
                        fontSize="inherit"
                        style={{
                          fontSize: 10,
                          position: "absolute",
                          top: 0,
                          right: 0,
                          fontSize: 10,
                          transform: "translate(5px, -5px)",
                        }}
                      />
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
                      alt={item?.name}
                      width={30}
                      className={styles.summaryImage}
                    />
                    <span className={styles.summaryText}>{item?.name}</span>
                  </div>
                ))}
            </div>
            <Button
              type="primary"
              onClick={onClose}
              color="default"
              variant="solid"
              shape="round"
              style={{ padding: 10, paddingTop: 15, paddingBottom: 15 }}
              size="small"
            >
              Try on
            </Button>
          </div>
        </div>
      )}
      <div className={styles.topBar}>
        <div className={styles.titleContainer}>
          <Button
            type="primary"
            onClick={onClose}
            color="default"
            variant="solid"
            style={{ padding: 5, borderRadius: 8 }}
            icon={<ChevronLeftRounded fontSize="medium" />}
            size="small"
          />

          <span className={styles.title}>Select Outfits for Fitting</span>
        </div>
        <ClothingNavBar selected={selectedTab} onSelect={setSelectedTab} />
      </div>
      <div className={styles.content}>
        <div className={styles.clothingItems}>
          {chunkArray(clothing.items[selectedTab], windowSize.width<1000?2:4 ).map((itemRow, idx) => (
            <div key={"row" + idx} className={styles.clothingRow}>
              {itemRow.map((item) => (
                <ClothingItem section={selectedTab} item={item} key={item.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
