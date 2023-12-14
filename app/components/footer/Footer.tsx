import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./Footer.module.css";
import { getCategories } from "@/lib/data";

const Footer = async () => {
    const categories = await getCategories();

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.logo}>
                    <Image src="/logo.png" alt="unoblog" width={50} height={50} style={{ borderRadius: '50%' }} />
                    <h1 className={styles.logoText}>unoBlog</h1>
                </div>
                <p className={styles.desc}>
                    Technology is a powerful tool, but, it is the people who build it and use it that truly drive innovation and progress.
                </p>
            </div>
            <div className={styles.links}>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Links</span>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div className={styles.list}>
                    <span className={styles.listTitle}>Social</span>
                    <Link href="/">Facebook</Link>
                    <Link href="/">Instagram</Link>
                    <Link href="/">Tiktok</Link>
                    <Link href="/">Youtube</Link>
                </div>
            </div>
        </div>
    );
};

export default Footer;
