import styles from "./HairStyleSelector.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { Icon } from "@mui/material";
import { CachedRounded } from "@mui/icons-material";
import CarouselItem from "./CarouselItem";
import HairColorSelector from "./HairColorSelector";
import constants, {  Hairstyles } from "./utils/Constants";

export default function HairStyleSelector() {
  const [{ hairLoading }, dispatch] =
    useStateProviderValue();

  return (
    <div className={styles.container}>
      <div className={styles.colorsContainer}>
        <div className={styles.hairstylesSelector}>
          {Hairstyles.map((item) => (
            <CarouselItem
              small
              section={"Hairstyles"}
              loading={hairLoading}
              item={item}
              key={item.id}
            />
          ))}
        </div>
        <div className={styles.divider} />
        <p className={styles.sectionSmallTitle}>Choose Hair Color</p>
        <div className={styles.hairstylesSelector}>
          {constants.hairColors.map((hairColor) => (
             <CarouselItem
             small
             section={"HairColor"}
             item={hairColor}
             loading={hairLoading}
             key={hairColor.path}
           />
          ))}
        </div>
      </div>
    </div>
  );
}
