import { useRef, useState } from "react";
import { ThemeProvider, styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import ChevronRightRounded from "@mui/icons-material/ChevronRightRounded";
import ChevronLeftRounded from "@mui/icons-material/ChevronLeftRounded";
import { FavoriteRounded } from "@mui/icons-material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import styles from "./Accordion.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import CustomeSlider from "./CustomeSlider";
import FaceSwap from "./FaceSwap";
import SkinColorSelector from "./SkinColorSelector";
import { Badge, Button, IconButton } from "@mui/material";
import constants, { clothing } from "./utils/Constants";
import HairColorSelector from "./HairColorSelector";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import SelectModal from "./SelectModal";
import { theme } from "../styles/theme";
const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
};

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))((props) => ({
  border: `0.75px solid #707070`,
  "border-radius": "20px",
  "margin-bottom": "20px",
  "&:before": {
    display: "none",
  },
  padding: props.small ? "5px" : "15px",
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(270deg)",
    color: "#E18500",
  },
  "& .Mui-expanded": {
    color: "#E18500",
  },

  "& .MuiAccordionSummary-expandIconWrapper": {
    transform: "rotate(90deg)",
  },

  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const CustomButton = styled((props) => <Button {...props} />)(({ theme }) => ({
  p: 0,
  flex: 1,
  width: "auto",
  minWidth: "20px",
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme, small }) => ({
  padding: small ? theme.spacing(1) : theme.spacing(3),
}));

const clothingItems = clothing.clothingSecitons.filter(
  (section) => section !== "Hairstyles"
);
export default function CustomizedAccordions({ small }) {
  const [expanded, setExpanded] = useState();
  const [selectModalOpen, setSelectModalOpen] = useState(false);

  const [{ size: modelSize, hairLoading }, dispatch] = useStateProviderValue();
  const sliderRef = useRef(null);
  const handleChange = (panel) => (event, newExpanded) => {
    const newPanel = newExpanded ? panel : false;
    setExpanded(newPanel);

    if (newPanel === "hairColor") {
      dispatch({ type: "SET_VIEWPORT", viewPort: "hair" });
    } else {
      dispatch({ type: "SET_VIEWPORT", viewPort: "home" });
    }

    if (panel !== "faceSwap") {
      dispatch({ type: "SET_FREEZE", freezeViewPort: false });
    }
  };
  const openModal = () => {
    setSelectModalOpen(true);
  };

  const closeModal = () => {
    setSelectModalOpen(false);
  };
  return (
    <div className={styles.dashboardContainer}>
      {selectModalOpen ? (
        <SelectModal open={true} closeModal={closeModal} />
      ) : (
        ""
      )}
      <div className={styles.headerContainer}>
        <div />
        <IconButton size="large">
          <Badge color="black" badgeContent={3}>
            <FavoriteRounded fontSize="60px" color="error" />
          </Badge>
        </IconButton>
      </div>
      <div className={styles.clothingTitleSection}>
        <span className={styles.openingSectionTitle}>
          Clothing & Accessories
        </span>
        <Button variant="outlined" onClick={openModal} color="black">
          Select
        </Button>
      </div>

      <div className={styles.openingSection}>
        <div>
          <div className={styles.sliderContainer}>
            <div
              onClick={() => sliderRef.current.slickPrev()}
              className={styles.navButton}
            >
              <ChevronLeftRounded small />
            </div>
            <div className={styles.slider}>
              <Slider ref={sliderRef} {...settings}>
                {clothingItems.map((section) =>
                  clothing.items[section].map((item) => (
                    <CarouselItem section={section} item={item} key={item.id} />
                  ))
                )}
              </Slider>
            </div>

            <div
              onClick={() => sliderRef.current.slickNext()}
              className={styles.navButton}
            >
              <ChevronRightRounded small />
            </div>
          </div>
        </div>
      </div>

      <span className={styles.sectionTitle}>Mannequin</span>

      <div className={`${styles.openingSection} ${styles.scrollable}`}>
        <Accordion
          small={small}
          expanded={expanded === "size"}
          onChange={handleChange("size")}
        >
          <AccordionSummary aria-controls="size-content" id="size-header">
            <span className={styles.accordionTitle}>
              Size, Height and proportions
            </span>
          </AccordionSummary>
          <AccordionDetails small={small}>
            <p className={styles.sectionSmallTitle}>Size</p>
            <div className={styles.sizeButton}>
              <ThemeProvider theme={theme}>
                {constants.sizes.map((size) => (
                  <CustomButton
                    variant={modelSize === size ? "contained" : "outlined"}
                    color={modelSize === size ? "secondary" : "black"}
                    size="small"
                    key={size}
                    onClick={() => {
                      dispatch({
                        type: "SET_SIZE",
                        size,
                      });
                    }}
                  >
                    {size}
                  </CustomButton>
                ))}
              </ThemeProvider>
            </div>
            {constants.sliders.map((slider) => (
              <CustomeSlider
                {...slider}
                key={slider.name}
                hoverHandler={() =>
                  dispatch({ type: "SET_VIEWPORT", viewPort: slider.viewPort })
                }
              />
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion
          small={small}
          expanded={expanded === "skinColor"}
          onChange={handleChange("skinColor")}
        >
          <AccordionSummary
            aria-controls="skinColor-content"
            id="skinColor-header"
          >
            <span className={styles.accordionTitle}>Skin Colour</span>
          </AccordionSummary>
          <AccordionDetails small={small}>
            <SkinColorSelector />
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "hairColor"}
          onChange={handleChange("hairColor")}
          small={small}
        >
          <AccordionSummary
            aria-controls="hairColor-content"
            id="hairColor-header"
          >
            <span className={styles.accordionTitle}>Hair</span>
          </AccordionSummary>
          <AccordionDetails small={small}>
            <p className={styles.sectionSmallTitle}>Hairstyle</p>
            <div className={styles.hairstylesSelector}>
              {clothing.items.Hairstyles.map((item) => (
                <CarouselItem
                  small
                  section={"Hairstyles"}
                  loading={hairLoading}
                  item={item}
                  key={item.id}
                />
              ))}
            </div>
            <br />
            <p className={styles.sectionSmallTitle}>Hair Color</p>
            <HairColorSelector />
          </AccordionDetails>
        </Accordion>

        <Accordion
          small={small}
          expanded={expanded === "faceSwap"}
          onChange={handleChange("faceSwap")}
        >
          <AccordionSummary
            aria-controls="faceSwap-content"
            id="faceSwap-header"
          >
            <span className={styles.accordionTitle}>Face Swap</span>
          </AccordionSummary>
          <AccordionDetails small={small}>
            <FaceSwap />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
