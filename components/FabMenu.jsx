import {
  CloseRounded,
  TuneRounded,
} from "@mui/icons-material";
import {
  Fab,
  Menu,
  ThemeProvider,
  createTheme,
  getContrastRatio,
} from "@mui/material";
import styles from "./FabMenu.module.css";
import { useRef, useState } from "react";
import CustomizedAccordions from "./Accordion";
const yellowellowBase = "#E18500";

const fabStyle = {
  position: "fixed",
  bottom: 16,
  left: 16,
};

const theme = createTheme({
  palette: {
    yellow: {
      main: yellowellowBase,
      light: yellowellowBase,
      dark: yellowellowBase,
      contrastText:
        getContrastRatio(yellowellowBase, "#fff") > 4.5 ? "#000" : "#fff",
    },
    black: {
      main: "#000",
      light: "#000",
      dark: "#000",
      contrastText: getContrastRatio("#000", "#fff") > 4.5 ? "#000" : "#fff",
    },
  },
});

export default function FabMenu() {
  const [menuOpen, setMenu] = useState();
  const fabRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState();
  const handleOpen = (menu, event) => {
    setMenu(menu);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setMenu();
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Fab
          ref={fabRef}
          className={styles.fabMenu}
          color="yellow"
          onClick={(e) => handleOpen("main", e)}
          sx={fabStyle}
          aria-label="edit"
        >
          {menuOpen ? <CloseRounded /> : <TuneRounded />}
        </Fab>
      </ThemeProvider>

      <Menu
        id="account-menu"
        open={menuOpen === "main"}
        onClose={handleClose}
        anchorEl={anchorEl}
        PaperProps={{
          elevation: 0,
          sx: {
            overflowY: "auto",
            overflowX: "hidden",
            maxWidth: "80%",
            maxHeight: "30%",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mb: 2.5,
            borderRadius: 5,
            padding: "0 20px",
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      >
        <CustomizedAccordions small />
      </Menu>
    </>
  );
}
