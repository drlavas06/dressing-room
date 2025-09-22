import styles from "./BodySizeSelector.module.css";
import { useStateProviderValue } from "../DataLayer/StateProvider";
import { Icon, styled, ThemeProvider } from "@mui/material";
import { ArrowDropDown, CachedRounded } from "@mui/icons-material";
import CarouselItem from "./CarouselItem";
import HairColorSelector from "./HairColorSelector";
import constants, { clothing } from "./utils/Constants";
import CustomeSlider from "./CustomeSlider";
import { theme } from "../styles/theme";
import { Button as MuiButton } from "@mui/material";
import { Button, ConfigProvider, Dropdown, Segmented } from "antd";
import { useState } from "react";

const CustomButton = styled((props) => <MuiButton {...props} />)(
  ({ theme, tiny }) => ({
    p: 0,
    minWidth: "20px",
    borderRadius: "30px",
    height: tiny ? "30px" : "40px",
    width: tiny ? "30px" : "40px",
    boxShadow: "none",
    fontSize: tiny ? "10px" : "12px",
    fontFamily: "Montserrat",
    "&:hover": {
      boxShadow: "none",
    },
  })
);

export default function BodySizeSelector() {
  const [{ size: modelSize, windowSize }, dispatch] = useStateProviderValue();
  const [unit, setUnit] = useState("in");
  const [selectedSlider, setSelectedSlider] = useState(
    constants.sliders[0].name
  );
  return (
    <div className={styles.container}>
      <div className={styles.colorsContainer}>
        <div className={styles.hairstylesSelector}>
          <div className={styles.sizeButton}>
            <ThemeProvider theme={theme}>
              {constants.sizes.map((size) => (
                <CustomButton
                  variant={"contained"}
                  color={modelSize === size ? "black" : "gray"}
                  size="small"
                  tiny={windowSize.width <= 1000}
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
          {windowSize.width > 1000 && (
            <div className={styles.measurementUnitContainer}>
              <span className={styles.measurementUnit}>Measure Unit</span>

              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      label: "cm",
                      key: "cm",
                      onClick: () => {
                        setUnit("cm");
                      },
                    },
                    {
                      label: "in",
                      key: "in",
                      onClick: () => {
                        setUnit("in");
                      },
                    },
                  ],
                }}
              >
                <p className={styles.selectedMeasurementUnit}>
                  {unit} <ArrowDropDown fontSize="small" />
                </p>
              </Dropdown>
            </div>
          )}
          {windowSize.width > 1000 ? (
            constants.sliders.map((slider) => (
              <CustomeSlider
                {...slider}
                key={slider.name}
                unitDivider={unit === "in" ? 2.54 : 1}
                setUnit={setUnit}
                hoverHandler={() =>
                  dispatch({ type: "SET_VIEWPORT", viewPort: slider.viewPort })
                }
              />
            ))
          ) : (
            <>
              <div className={styles.slidersSelectorContainer}>
                {constants.sliders.map((slider) => (
                  <Button
                    size="small"
                    key={slider.name}
                    onClick={() => setSelectedSlider(slider.name)}
                    shape="round"
                    color="default"
                    style={{ padding: 10, fontSize: 10 }}
                    variant={selectedSlider === slider.name ? "solid" : "text"}
                  >
                    <p className={styles.tabItemLabel}>{slider.title}</p>
                  </Button>
                ))}
              </div>
              <CustomeSlider
                {...constants.sliders.find(
                  (slider) => slider.name === selectedSlider
                )}
                key={selectedSlider}
                shouldShowUnitSelector={true}
                unitDivider={unit === "in" ? 2.54 : 1}
                setUnit={setUnit}
                hoverHandler={() =>
                  dispatch({
                    type: "SET_VIEWPORT",
                    viewPort: constants.sliders.find(
                      (slider) => slider.name === selectedSlider
                    ).viewPortSmall,
                  })
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
