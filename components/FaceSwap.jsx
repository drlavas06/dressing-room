import { useCallback, useRef, useState } from "react";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import styles from "./FaceSwap.module.css";
import imageCompression from "browser-image-compression";
import { Alert, Avatar } from "@mui/material";
import { Button as AntButton, Modal } from "antd";

import { useStateProviderValue } from "../DataLayer/StateProvider";
import { PortraitRounded } from "@mui/icons-material";
import Webcam from "react-webcam";
import { downloadBase64File } from "./utils/base64";
import Image from "next/image";

const theme = createTheme({
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          padding: "15px 30px",
        },
      },
    },
  },
});

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const base64ToFile = async (base64String) => {
  const fetchResponse = await fetch(base64String);
  const blob = await fetchResponse.blob();
  return new File([blob], "image.jpg", { type: "image/jpeg" });
};

export default function FaceSwap() {
  const [image, setImage] = useState();
  const [{ bg }, dispatch] = useStateProviderValue();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const uploadElementRef = useRef(null);
  const setBase64Image = useCallback((file) => {
    setError();
    if (!file) return;
    var reader = new FileReader();
    let base64;
    if (file.size > 1000000) {
      setError("Uploaded Image is too big, please try again");
      return "";
    }
    reader.readAsDataURL(file);
    reader.onload = function () {
      setImage(reader.result);
    };
    reader.onerror = function (error) {
      console.error("Error: ", error);
    };
    return base64;
  }, []);
  const [swappedImage, setSwappedImage] = useState(null);
  const onSubmitFaceSwap = async (image) => {
    try {
      setError();
      const bgFile = await base64ToFile(bg);

      // Compress the file
      const compressedFile = await imageCompression(bgFile, {
        maxSizeMB: 2,
      });

      // Convert compressed file back to base64
      const compressedBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(compressedFile);
      });

      const response = await fetch("/api/swap", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          target: compressedBase64,
          swap: image,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Face swap failed");
      }
      const decodedRes = await response.json();
      const imagefile = await fetch(decodedRes);
      const imageBlob = await imagefile.blob();
      setSwappedImage(URL.createObjectURL(imageBlob));
    } catch (e) {
      console.log({ e });
      setError("something went wrong in faceswap, please try again");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Modal
          centered
          style={{borderRadius: "30px", overflow: "hidden"}}
          open={swappedImage !== null}
          onOk={() => downloadBase64File(
            swappedImage,
            "swapped_face.jpg"
          )}
          onCancel={() => setSwappedImage(null)}
          width={{
            xs: "90%",
            sm: "80%",
            md: "70%",
            lg: "60%",
            xl: "50%",
            xxl: "40%",
          }}
          okText="Download"
          cancelText="Close"
          okButtonProps={{ style:{padding:15}, color:"default", variant:"solid", shape:"round" }}
          cancelButtonProps={{ style:{padding:15}, color:"black", variant:"outlined", shape:"round"}}
        >
          <div className={styles.modalContent}>
            <div className={styles.modalPicture}>
              {swappedImage !== null ? (
                <img
                  src={swappedImage}
                  alt="Swapped Face"
                  className={styles.swappedImage}
                  style={{ width: "auto", height: "100%" , objectFit: 'contain'}}
                />
              ) : null}
            </div>
          </div>
        </Modal>

        <div className={styles.modalUploadContainer}>
          <div className={styles.modalActionAvatarContainer}>
            <div
              onClick={() => {
                dispatch({
                  type: "TAKE_SNAPSHOT",
                  snapShot: new Date().getTime(),
                  downloadTo: "memory",
                });
                setImage();
                uploadElementRef.current.click();
              }}
              className={styles.modalActionAvatar}
            >
              {!image ? (
                <PortraitRounded fontSize="large" />
              ) : (
                <Avatar
                  sx={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "45px",
                  }}
                  alt="picture"
                  src={image}
                />
              )}
            </div>
          </div>

          <div className={styles.modalActionAvatarContainer}>
            <AntButton
              size="small"
              shape="round"
              onClick={async () => {
                setLoading(true);
                await onSubmitFaceSwap(image);
              }}
              disabled={!image || loading}
              style={{ padding: 15 }}
              color="default"
              variant="solid"
            >
              <p className={styles.tabItemLabel}>
                {loading ? "Processing" : "Swap"}
              </p>
            </AntButton>
          </div>
        </div>
        <VisuallyHiddenInput
          ref={uploadElementRef}
          onChange={(event) => {
            setBase64Image(event.target.files[0]);
          }}
          type="file"
          accept="image/jpg, image/jpeg"
        />

        {error ? (
          <>
            <Alert severity="error">{error}</Alert>
            <br />
          </>
        ) : (
          ""
        )}
        <div className={styles.actionContainer}>
          <p className={styles.subtitleMain}>
            Photo has to be in <b>.jpg</b> format. maximum size <b>1 mb</b>.
          </p>
          <p className={styles.subtitleSec}>
            For best results choose a high quality photo with a face fully
            visible.
          </p>
        </div>
      </div>
    </>
  );
}
