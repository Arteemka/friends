import React from "react";
import styles from "./Loading.css";

export default () => (
  <div className={styles["lds-ring"]}>
    <div className={styles.items} />
    <div className={styles.items} />
    <div className={styles.items} />
    <div className={styles.items} />
  </div>
);
