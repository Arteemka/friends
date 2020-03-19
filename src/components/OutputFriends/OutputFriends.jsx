import React from "react";
import { Link } from "react-router-dom";
import styles from "./OutputFriends.css";

const OutputFriends = props => (
  <div className={styles.outputItems}>
    {props.items.map(item => (
      <div key={item.id} className={styles.outputBlockItem}>
        <div className={styles.itemInitial}>
          {item.name
            .split(" ")
            .map(w => w[0])
            .join("")}
        </div>
        <div className={styles.outputInfo}>
          <Link to={"/" + item.id}>
            <h4 className={styles.itemName}>{item.name}</h4>
          </Link>
          <span className={styles.sex}>{item.gender},</span>
          <span className={styles.year}>{item.age} y.o.,</span>
          <span className={styles.works}>works for {item.company}</span>
        </div>
      </div>
    ))}
  </div>
);

export default OutputFriends;
