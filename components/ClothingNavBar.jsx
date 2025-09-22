"use client";
import React, { useState } from "react";
import { Button, ConfigProvider, Segmented } from "antd";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { clothing } from "./utils/Constants";
import styles from "./ClothingNavBar.module.css";

export const ClothingNavBar = ({ selected, onSelect }) => {
  const [{ windowSize }] = useStateProviderValue();
  return windowSize.width <= 1000 ? (
    <div className={styles.slidersSelectorContainer}>
      {clothing.clothingSections.map((slider) => (
        <Button
          size="small"
          key={slider.label}
          onClick={() => onSelect(slider.value)}
          shape="round"
          color="default"
          style={{ padding: 10, fontSize: 8 }}
          variant={selected === slider.value ? "solid" : "text"}
        >
          <p className={styles.tabItemLabel}>{slider.label}</p>
        </Button>
      ))}
    </div>
  ) : (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: "#f4f4f4",
            itemSelectedColor: "white",
            itemSelectedBg: "#1E1E1E",
            itemHoverColor: "#1E1E1E",
            itemHoverBg: "transparent",
            controlHeightLG: 60,
            fontFamily: '"Montserrat", sans-serif',
            trackPadding: 10,
            controlPaddingHorizontal: 15,
            controlPaddingVertical: 10,
          },
        },
      }}
    >
      <Segmented
        options={clothing.clothingSections}
        shape="round"
        size="large"
        value={selected}
        onChange={onSelect}
      />
    </ConfigProvider>
  );
};
