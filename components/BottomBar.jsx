"use client";
import React, { useState } from "react";
import styles from "./BottomBar.module.css";
import { Button } from "antd";
import { useStateProviderValue } from "../DataLayer/StateProvider";

export const BottomBar = () => {
  const [mannequin, setMannequin] = useState("adult");
    const [{windowSize}, dispatch] = useStateProviderValue();
  
  return (
    <div className={styles.container}>
      <div className={styles.mannequinSelector}>
        <span className={styles.mannequinTitle}>Mannequin</span>

          <div>
            <Button
              size="middle"
              onClick={() => setMannequin("adult")}
              shape="round"
              color="default"
              style={{ padding: 10 }}
              variant={mannequin === "adult" ? "solid" : "text"}
            >
              <p className={styles.tabItemLabel}>Adult</p>
              <svg
                width="20"
                height="20"
                stroke={mannequin === "adult" ? "white" : "black"}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8332 17.5V15.8333C15.8332 14.9493 15.482 14.1014 14.8569 13.4763C14.2317 12.8512 13.3839 12.5 12.4998 12.5H7.49984C6.61578 12.5 5.76794 12.8512 5.14281 13.4763C4.51769 14.1014 4.1665 14.9493 4.1665 15.8333V17.5"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Button
              size="middle"
              style={{ padding: 10 }}
              onClick={() => setMannequin("kid")}
              shape="round"
              color="default"
              variant={mannequin === "kid" ? "solid" : "text"}
            >
              <p className={styles.tabItemLabel}>Kid</p>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                stroke={mannequin === "kid" ? "white" : "black"}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 10H7.50833"
                  stroke="currentColor"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.5 10H12.5083"
                  stroke="currentColor"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.3335 13.3333C8.75016 13.5833 9.3335 13.75 10.0002 13.75C10.6668 13.75 11.2502 13.5833 11.6668 13.3333"
                  stroke="currentColor"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.8334 5.25C16.5884 6.19639 17.103 7.31148 17.3334 8.5C17.6152 8.63647 17.8528 8.84956 18.0191 9.11485C18.1854 9.38014 18.2736 9.68691 18.2736 10C18.2736 10.3131 18.1854 10.6199 18.0191 10.8851C17.8528 11.1504 17.6152 11.3635 17.3334 11.5C16.9737 13.1779 16.0494 14.6817 14.7148 15.7604C13.3803 16.8392 11.7161 17.4277 10.0001 17.4277C8.28405 17.4277 6.61991 16.8392 5.28534 15.7604C3.95078 14.6817 3.0265 13.1779 2.66675 11.5C2.38496 11.3635 2.14732 11.1504 1.98104 10.8851C1.81475 10.6199 1.72656 10.3131 1.72656 10C1.72656 9.68691 1.81475 9.38014 1.98104 9.11485C2.14732 8.84956 2.38496 8.63647 2.66675 8.5C3.01197 6.80875 3.92999 5.28835 5.26593 4.19531C6.60188 3.10226 8.27396 2.50348 10.0001 2.5C11.6667 2.5 12.9167 3.41667 12.9167 4.58333C12.9167 5.75 12.1667 6.66667 11.2501 6.66667C10.5834 6.66667 10.0001 6.33333 10.0001 5.83333"
                  stroke="currentColor"
                  stroke-width="0.833333"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
          </div>
      </div>
      <div className={styles.exportContainer}>
        <Button size={windowSize.width>1000?"large":"small"} shape="round" onClick={()=>dispatch({
              type: "TAKE_SNAPSHOT",
              snapShot: new Date().getTime(),
              downloadTo: "local",
            })
            } style={{padding:15}} color="default" variant="solid">
          <p className={styles.tabButtonLabel}>Export Image</p>
        </Button>
      </div>
    </div>
  );
};
