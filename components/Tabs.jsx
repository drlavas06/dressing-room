"use client";
import React from "react";
import { ConfigProvider, Segmented } from "antd";
import { useStateProviderValue } from "../DataLayer/StateProvider";


export const Tabs = () => {

  const [{ activeController, windowSize }, dispatch] = useStateProviderValue();
  const onChange = (value) => {
    dispatch({
      type: "SET_ACTIVE_CONTROLLER",
      activeController: value,
    });
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: {
            trackBg: windowSize.width>1000?"#f4f4f4":"#ffffff",
            itemColor: windowSize.width>1000?"#1E1E1E":"#bfbfbf",
            itemSelectedColor:windowSize.width>1000?"white":"#1E1E1E" ,
            itemSelectedBg: windowSize.width>1000?"#1E1E1E":"transparent",
            itemHoverColor: "#1E1E1E",
            itemHoverBg: "transparent",
            controlHeightLG: 60,
            controlHeightSM: 50,
            fontFamily: '"Montserrat", sans-serif',
            fontSize: windowSize.width>1000?"1.2rem":"0.6rem",
            trackPadding: windowSize.width>1000?8:5,
            controlPaddingHorizontal: windowSize.width>1000?20:0, 
            controlPaddingVertical: 10,
          },
        },
      }}
    >
      <Segmented
        options={[
          { label: "Skin color", value: "skinColor" },
          { label: "Hairstyle", value: "hairstyle" },
          { label: "Body proportions", value: "bodyProportions" },
          { label: "Clothes", value: "clothes" },
          { label: "Face swap", value: "faceSwap" },
        ]}
        shape="round"
        size={windowSize.width>1000?"large":"small"}
        value={activeController}
        
        onChange={onChange}
      />
    </ConfigProvider>
  );
};
