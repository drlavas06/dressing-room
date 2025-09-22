import styles from "./FaceSwapSelector.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import FaceSwap from "./FaceSwap";
import { Typography } from "antd";

export default function FaceSwapSelector() {
  const [{}, dispatch] = useStateProviderValue();

  return (
    <div className={styles.container}>
      <Typography variant="h6" className={styles.title}>
        Personalize the mannequins face by uploading a photo of you or your
        loved ones.
      </Typography>

      <div className={styles.noticeContainer}>
        <p className={styles.noticeText}>
          Before uploading a photo, make sure you have selected your{" "}
          <strong>skin color</strong>.
        </p>
      </div>
      <FaceSwap />
    </div>
  );
}
