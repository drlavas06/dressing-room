import React, { useCallback } from "react";
import constants from "./utils/Constants";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import styles from "./ClothingItem.module.css";
import { Button } from "antd";

function ClothingItem({ section, item, small = false, loading = false }) {
  const [{ size, selectedClothe, hairColor, skinColor }, dispatch] =
    useStateProviderValue();
  let url =
    [
      constants.storageBaseUrl,
      "clothing",
      section.toLowerCase(),
      `${item.id}.jpg`,
    ].join("%2F") + "?alt=media";


  const setClothe = useCallback(() => {
    if (section === "Shoes") {
      dispatch({
        type:"SET_MODEL_PROP",
        [item.morph.name]: item.morph.value
      })
    }
    dispatch({
      type: "SET_SELECTION",
      key: section,
      value: item,
    });
  }, [dispatch, item, section]);

  return (
    <div className={styles.clothingItemContiner}>
      <div className={styles.crouselItem}>
        <div className={styles.overlay}>
          <div className={styles.overlayButtons}>
          <div className={styles.overlayButton} onClick={()=>window.open("https://google.com", '_blank')}>View In Store</div>

            <div className={styles.overlayButton} onClick={setClothe}>Fit on Model</div>
          </div>
        </div>
        <img src={url} className={styles.thumbNail} />
      </div>
      <div className={styles.clothingName}>{item.displayName}</div>
    </div>
  );
}

export default ClothingItem;
