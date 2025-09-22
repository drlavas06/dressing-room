import React from "react";
import styles from "./OverlayActions.module.css";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  Download,
  FavoriteBorder,
  AutoModeRounded,
  OpenWithRounded,
  SwipeVerticalRounded,
} from "@mui/icons-material";
import { useStateProviderValue } from "../DataLayer/StateProvider";
export const OverlayActions = () => {
  const [{ mouseAction }, dispatch] = useStateProviderValue();

  const handleChange = (event, action) => {
    if (action) {
      dispatch({
        type: "SET_MOSUE_ACTION",
        mouseAction: action,
      });
    }
  };

  return (
    <div className={styles.overlayActionsContainer}>
      <div className={styles.overlayActionsTop}>
        <IconButton
          size="medium"
          onClick={() =>
            dispatch({
              type: "TAKE_SNAPSHOT",
              snapShot: new Date().getTime(),
              downloadTo: "local",
            })
          }
        >
          <Download fontSize="40px" color="action" />
        </IconButton>
        <IconButton size="medium">
          <FavoriteBorder fontSize="40px" color="error" />
        </IconButton>
      </div>

      <div className={styles.overlayActionsbottom}>
        <ToggleButtonGroup
          orientation="vertical"
          exclusive
          style={{ bottom: 0 }}
          value={mouseAction}
          onChange={handleChange}
        >
          <ToggleButton value="rotate" aria-label="rotate">
            <AutoModeRounded />
          </ToggleButton>
          <ToggleButton value="pan" aria-label="pan">
            <SwipeVerticalRounded />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </div>
  );
};
