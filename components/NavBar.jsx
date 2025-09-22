import React from "react";
import styles from "./NavBar.module.css";
import Logo from "./assets/Logo.svg";
import Image from "next/image";
import { navigationLinks } from "./utils/Constants";

export const NavBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <Image
          src={Logo}
          width={180}
          height={55}
          style={{ width: "100px", height: "50px", position: "relative" }}
          alt="mySvgImage"
        />
      </div>
      <div className={styles.navItemContainer}>
        {navigationLinks.map((item) => (
          <a key={`item.to-item.label`} className={styles.navItem} href={item.to} target={item.target}>
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};
