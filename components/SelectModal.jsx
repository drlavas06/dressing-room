/* eslint-disable @next/next/no-img-element */
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styles from "./SelectModal.module.css";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { Close } from "@mui/icons-material";
import constants, { clothing } from "./utils/Constants";
import { useState } from "react";

const itemList = Object.keys(clothing.items);
const getImgUrl = (id, section, size) =>(
  [
    constants.storageBaseUrl,
    "clothing",
    section.toLowerCase(),
    `${size}_${id}.png`,
  ].join("%2F") + "?alt=media"
)
  
export default function SelectModal({ open, closeModal }) {
  const [activeTab, setActiveTab] = useState(itemList[0]);
  const [{ size, selectedClothe }, dispatch] = useStateProviderValue();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <Dialog fullWidth={true} maxWidth={"lg"} open={open} onClose={closeModal}>
        <DialogTitle sx={{ textAlign: "left", fontSize: 25 }}>
          Select Outfits for Fitting
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={closeModal}
          sx={{
            position: "absolute",
            right: 30,
            top: 25,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>

        <DialogContent>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              {itemList.map((tab) => (
                <Tab key={tab} value={tab} label={tab} />
              ))}
            </Tabs>
          </Box>
          <div className={styles.itemListContainer}>
            {clothing.items[activeTab].map((item) => (
              <div className={styles.itemContainer} key={item.displayName}>
                <img url={getImgUrl(item.id, activeTab, size)} alt="" className={styles.thumbnail}/>
                <span> {item.displayName} </span>
                <Button color="secondary" variant="outlined">Select</Button>
              </div>
            ))}
          </div>

        </DialogContent>
        <DialogActions>
          <Button>Done</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
