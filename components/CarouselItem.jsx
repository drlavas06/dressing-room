import React, { useCallback } from "react";
import constants from "./utils/Constants";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import styles from "./Crousel.module.css";

function CarouselItem({ section, item, small = false, loading=false }) {
  const [{ size, selectedClothe, hairColor }, dispatch] = useStateProviderValue();
  let url =
    [
      constants.storageBaseUrl,
      "clothing",
      section.toLowerCase(),
      `${item.id}.jpg`,
    ].join("%2F") + "?alt=media";

  if (section === "Hairstyles") {
    url =
      [
        constants.storageBaseUrl,
        "clothing",
        section.toLowerCase(),
        `${item.id}.jpg`,
      ].join("%2F") + "?alt=media";
  }

  let selected = selectedClothe[section]?.id === item?.id;
  if (section === "HairColor") {
    url =
    [
      constants.storageBaseUrl,
      "clothing",
      "hairstyles",
      "color",
      `${item.path}.jpg`,
    ].join("%2F") + "?alt=media"
    selected = hairColor.path === item?.path;
  }


  const setClothe = useCallback(() => {
    if (section === "HairColor") {
      dispatch({
        type: "SET_HAIR_COLOR",
        hairColor: item,
      });
      return;
    }

    dispatch({
      type: "SET_SELECTION",
      key: section,
      value: item,
    });
  }, [dispatch, item, section]);

  return (
    <div
      onClick={setClothe}
      className={`${styles.crouselItem} ${selected && styles.selected} ${
        small ? styles.smallItem : styles.margin
      } ${loading?styles.loading:""}`}
    >
      <img src={url} className={styles.thumbNail} />
    </div>
  );
}

export default CarouselItem;
