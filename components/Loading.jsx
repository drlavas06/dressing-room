import styles from './Loading.module.css';
import { Backdrop } from '@mui/material';

export default function Loading({ open, children }) {
  return (
    <>
        <Backdrop
    className={styles.backdropContainer}
      sx={{ backgroundColor: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
      open={open}
    >
      <span className={styles.loader}></span>
      <p className={styles.loadingSubTitle}>Personalising your experience</p>
    </Backdrop>
    <div className={open && styles.hidden}>
      {children}
    </div>
    </>
  )
}
