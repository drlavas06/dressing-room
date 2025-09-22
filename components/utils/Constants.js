
const constants = {
  storageBaseUrl: 
    "https://firebasestorage.googleapis.com/v0/b/josnsof.appspot.com/o/3d-assets",
  skinColors: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "8.jpg",
    "9.jpg",
    "10.jpg",
    "11.jpg",
  ],
  hairColors: [
    { thumbnailColor: "#FDF5E6", path: "1", label: "Lightest Blonde" },
    { thumbnailColor: "#FAE7B5", path: "2", label: "Blonde" },
    { thumbnailColor: "#C3AB7E", path: "3", label: "Dark Blonde" },
    { thumbnailColor: "#7A5230", path: "4", label: "Medium Brown" },
    { thumbnailColor: "#4A322E", path: "5", label: "Dark Brown" },
    { thumbnailColor: "#2C1B10", path: "6", label: "Darkest Brown" },
    { thumbnailColor: "#1C1C1C", path: "7", label: "Black" },
    { thumbnailColor: "#000000", path: "8", label: "Darkest Black" },
    { thumbnailColor: "#732E2E", path: "9", label: "Rich Vine" },
    { thumbnailColor: "#A52A2A", path: "10", label: "Vivacious Red" },
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  adjustableAreas: ["Waist", "Hip", "Height", "Breasts"],

  sliders: [
    {
      name: "height",
      min: -100,
      max: 0,
      displayMin: {
        XS: 150,
        S: 150,
        M: 150,
        L: 150,
        XL: 150,
      },
      displayMax: {
        XS: 190,
        S: 190,
        M: 190,
        L: 190,
        XL: 190,
      },
      viewPort: "frontFull",
      viewPortSmall:"frontFullSmall",
      title: "Height",
    },
    {
      name: "breast",
      min: 0,
      displayMin: {
        XS: 74,
        S: 80,
        M: 86,
        L: 98,
        XL: 104,
      },
      displayMax: {
        XS: 89,
        S: 97,
        M: 105,
        L: 120,
        XL: 128,
      },
      max: 100,
      viewPort: "breast",
      viewPortSmall:"breastSmall",
      title: "Breast size",
    },
    {
      name: "waist",
      min: 0,
      max: 100,
      displayMin: {
        XS: 47,
        S: 52,
        M: 57,
        L: 67,
        XL: 72,
      },
      displayMax: {
        XS: 70,
        S: 76,
        M: 83,
        L: 97,
        XL: 104,
      },
      viewPort: "waist",
      viewPortSmall:"waistSmall",
      title: "Waist",
    },
    {
      name: "hip",
      min: 0,
      max: 100,
      displayMin: {
        XS: 72,
        S: 80,
        M: 87,
        L: 100,
        XL: 108,
      },
      displayMax: {
        XS: 91,
        S: 100,
        M: 109,
        L: 126,
        XL: 135,
      },
      viewPort: "hip",
      viewPortSmall:"hipSmall",
      title: "Hip",
    },
  ],
  viewPortCoords: {
    skinColorSelector: {
      radius: 4,
      beta: 1.5,
      alpha: 1,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    hairstyleSelector: {
      radius: 1.3,
      beta: 1.3,
      alpha: 2,
      target: {
        x: 0,
        y: 1.4,
        z: 0,
      },
    },
    hairstyleSelectorSmall:{
      radius: 2,
      beta: 1.3,
      alpha: 2,
      target: {
        x: 0,
        y: 1.3,
        z: 0,
      },
    },
    bodyProportionsSelector: {
      radius: 4,
      beta: 1.5,
      alpha: 1,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    clothesSelector: {
      radius: 4,
      beta: 1.5,
      alpha: 1,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    faceSwapSelector: {
      radius: 4,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    home: {
      radius: 4,
      beta: 1.5,
      alpha: 1,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    breast: {
      radius: 1.3,
      beta: 1.3,
      alpha: 2,
      target: {
        x: 0,
        y: 1.3,
        z: 0,
      },
    },
    hair: {
      radius: 1.3,
      beta: 1.3,
      alpha: 2,
      target: {
        x: 0,
        y: 1.5,
        z: 0,
      },
    },

    frontFull: {
      radius: 4,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    frontFullSmall: {
      radius: 4,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    hip: {
      radius: 1.2,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.9,
        z: 0,
      },
    },
    hipSmall: {
      radius: 2,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.75,
        z: 0,
      },},
    waist: {
      radius: 1.2,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 1.1,
        z: 0,
      },
    },
    waistSmall: {
      radius: 2,
      beta: 1.5,
      alpha: 1.5,
      target: {
        x: 0,
        y: 0.8,
        z: 0,
      },
    },
    breastSmall: {
      radius: 2,
      beta: 1.3,
      alpha: 2,
      target: {
        x: 0,
        y: 1.1,
        z: 0,
      },
    },
  },
};
export const clothing = {
  clothingSections: [
    { label: "Tops", value:"Tops" },
    { label: "Blouses", value:"Blouses" },
    { label: "Bottoms", value:"Bottoms" },
    { label: "Shoes", value:"Shoes" },
    { label: "Accessories", value:"Accessories" },
    { label: "Makeup", value:"Makeup" },
  ],
  items: {
    Tops: [
      {
        displayName: "BOWS TOP",
        id: 1,
        description: "A golden top with bows",
        url: "https://google.com",
      },
      {
        displayName: "Silver TOP",
        id: 2,
        description: "A silver top with bows",
        url: "https://google.com",
      }
    ],
    Blouses: [],
    Bottoms: [],
    Shoes: [
            {
        displayName: "Heels",
        id: 2,
        morph:{
          name:"heel",
          value:57
        }
      },
      {
        displayName: "Flats",
        id: 1,
        morph:{
          name:"heel",
          value:0
        }
      }

    ],
    Accessories: [],
    Makeup: [],
  },
};
export const Hairstyles = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  }
]

export const navigationLinks = [
  {
    label: "sample title",
    to: "https://google.com",
    target: "_blank",
  },
  {
    label: "sample title",
    to: "https://google.com",
    target: "_blank",
  },
  {
    label: "sample title",
    to: "https://google.com",
    target: "_blank",
  },
];
export default constants;
