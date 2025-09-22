import React from 'react';
import styles from './Overlay.module.css';
import { useStateProviderValue } from '../DataLayer/StateProvider';
import { clothing } from './utils/Constants';

export const OverlayInfo = () => {
  const [{ selectedClothe }] = useStateProviderValue();
  return (
    <>
      <div className={styles.overlayInfoContainer}>
        {clothing.clothingSecitons.filter(clothing=>selectedClothe[clothing]?.displayName?.length>0).map(clothing=>(
          <p key={clothing} className={styles.overlayInfo}>{clothing}: { selectedClothe[clothing] ? selectedClothe[clothing].displayName: "-"}</p>
        ))}
      </div>
    </>
  );
};
