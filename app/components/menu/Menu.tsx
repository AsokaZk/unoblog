import React from "react";
import MenuPosts from "../menu-posts/MenuPosts";
import MenuCategories from "../menu-categories/MenuCategories";

import styles from "./Menu.module.css";

const Menu = () => {
    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>{"What's hot"}</h2>

            <h1 className={styles.title}>Most Popular</h1>
            <MenuPosts withImage={false} />

            <h2 className={styles.subtitle}>Discover by topic</h2>
            <h1 className={styles.title}>Categories</h1>
            <MenuCategories />
        </div>
    );
};

export default Menu;
