import styles from './SkinColorSelector.module.css';
import { useStateProviderValue } from '../DataLayer/StateProvider';
import constants from './utils/Constants';
import { Tooltip } from '@mui/material';

const getHairUrl = (id) =>
  ([
    constants.storageBaseUrl,
    "clothing",
    "hairstyles",
    "color",
    `${id}.jpg`,
  ].join("%2F") + "?alt=media");
  


export default function HairColorSelector() {
  const [{ hairColor: selectedHairColor, selectedClothe, hairLoading }, dispatch] = useStateProviderValue();

  const selectColor = (color) => {
    dispatch({
      type: 'SET_HAIR_COLOR',
      hairColor: color,
    });
  };
  console.log('hairColor');
  return (
    <div className={styles.colorsContainer}>
      {constants.hairColors.map((hairColor) => (
        <div key={hairColor.thumbnailColor} className={styles.colorBox}>
          <Tooltip title={hairColor.label} followCursor >
          <img
            alt={hairColor.label}
            className={`${styles.coloContent} ${
              selectedHairColor.thumbnailColor === hairColor.thumbnailColor && styles.selectedColorBox
            } ${(selectedClothe.Hairstyles==null || hairLoading) && styles.disabledColorBox}`}
            src={getHairUrl(hairColor.path)}
            style={{aspectRatio: '1/2'}}
            onClick={() => selectColor(hairColor)}
          />
          </Tooltip>
        </div>
      ))}
    </div>
  );
}
