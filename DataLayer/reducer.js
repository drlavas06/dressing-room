import { clothing } from "../components/utils/Constants";
import constants from "../components/utils/Constants";

export const initialState = {
  modelProp: {
    height: -50,
    breast: 50,
    breastMM: 50,
    hip: 50,
    waist: 50,
    heel: 57,
  },
  selectedClothe: {
    Hairstyles: {
      id: 6,
    },
    Shoes: clothing.items.Shoes[0],
    Tops: clothing.items.Tops[1]
  },
  size: "M",
  snapShot: undefined,
  downloadTo: null,
  viewPort: "home",
  freezeViewPort: false,
  loading: true,
  initialSkinLoading: true,
  skinColor: { displayColor: constants.skinColors[4], value: 5},
  hairColor: constants.hairColors[3],
  hairLoading: false,
  skinLoading: false,
  mouseAction: "rotate",
  windowSize: {
    width: 0,
    height: 0,
  },
  activeController: "skinColor",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SHOULD_SHOW_BROWSE_BUTTON":
      return {
        ...state,
        shouldShowBrowseButton: action.shouldShowBrowseButton,
      };
    case "SET_SKIN_LOADED":
      return {
        ...state,
        initialSkinLoading: false,
      };
    case "SET_ACTIVE_PREVIEW_ITEM":
      return {
        ...state,
        activePreviewItem: action.activePreviewItem,
      };
    case "SET_SELECTION":
      return {
        ...state,
        selectedClothe: {
          ...state.selectedClothe,
          [action.key]: action.value,
        },
      };
    case "SET_WINDOW_SIZE":
      return {
        ...state,
        windowSize: action.windowSize,
      };

    case "SET_SIZE":
      return {
        ...state,
        size: action.size,
      };
    case "SET_ACTIVE_CONTROLLER":
      return {
        ...state,
        activeController: action.activeController,
      };
    case "SET_MOSUE_ACTION":
      return {
        ...state,
        mouseAction: action.mouseAction,
      };

    case "SET_HAIR_LOADING":
      return {
        ...state,
        hairLoading: action.hairLoading,
      };
    case "SET_SKIN_LOADING":
      return {
        ...state,
        skinLoading: action.skinLoading,
      };
    case "SET_HAIR_COLOR":
      return {
        ...state,
        hairColor: action.hairColor,
      };
    case "SET_MODEL_PROP":
      return {
        ...state,
        modelProp: {
          ...state.modelProp,
          ...Object.entries(action)
            .map(([key, value]) => (key !== "type" ? { [key]: value } : null))
            .filter((item) => item !== null)
            .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
        },
      };
    case "SET_STAGE":
      return {
        ...state,
        stage: action.stage,
      };
    case "SET_SKIN_COLOR":
      return {
        ...state,
        skinColor: action.skinColor,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.loading,
      };
    case "SET_FREEZE":
      return {
        ...state,
        freezeViewPort: action.freezeViewPort,
      };
    case "TAKE_SNAPSHOT":
      return {
        ...state,
        snapShot: action.snapShot,
        downloadTo: action.downloadTo ?? "local",
      };
    case "SET_BG":
      return {
        ...state,
        bg: action.bg,
      };
    case "SET_VIEWPORT":
      return {
        ...state,
        viewPort: action.viewPort,
      };
    default:
      return state;
  }
};

export default reducer;
