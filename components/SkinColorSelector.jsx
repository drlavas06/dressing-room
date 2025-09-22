import styles from "./SkinColorSelector.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import constants from "./utils/Constants";
import { Icon } from "@mui/material";
import { CachedRounded } from "@mui/icons-material";

export default function SkinColorSelector() {
  const [{ skinColor: selectedSkinColor, skinLoading }, dispatch] =
    useStateProviderValue();

  const selectColor = (color, idx) => {
    dispatch({
      type: "SET_SKIN_LOADING",
      skinLoading: true,
    });

    dispatch({
      type: "SET_SKIN_COLOR",
      skinColor: { displayColor: color, value: idx + 1 },
    });
  };
  const loadingEffect = skinLoading
    ? { opacity: 0.5, pointerEvents: "none" }
    : {};
  const url = (color) =>
    `${constants.storageBaseUrl}%2Ftexture%2F${color}?alt=media`;
  return (
    <div className={styles.container}>
    <div className={styles.colorsContainer}>
      {constants.skinColors.map((skinColor, idx) => (
        <div key={skinColor} className={styles.colorBox}>
          <div
            className={`${styles.coloContent} ${
              selectedSkinColor.displayColor === skinColor &&
              styles.selectedColorBox
            }`}
            style={{
              backgroundImage: `url("${url(skinColor)}")`,
              backgroundSize: "cover",
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'bottom',
              ...loadingEffect,
            }}
            onClick={() => selectColor(skinColor, idx)}
          />
        </div>
      ))}
      </div>
    </div>
  );
}
