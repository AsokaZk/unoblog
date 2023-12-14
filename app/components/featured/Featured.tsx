
import React from 'react'
import Image from 'next/image'

import styles from './Featured.module.css'

const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b className={styles.title2}>Hello there!</b> Discover the best books to read.
            </h1>
            <div className={styles.post}>
                <div className={styles.imageContainer}>
                    <Image src="https://res.cloudinary.com/delpnrpse/image/upload/v1702509219/imh5gtfhbq4crgz9fbip.jpg" alt="" fill className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.postTitle}>Discover Worlds Within Words</h2>
                    <p className={styles.postDesc}>Embark on a literary journey with our curated collection of books. From gripping fiction to enlightening non-fiction, our store offers a diverse selection that caters to every reader's taste. Immerse yourself in captivating stories, explore new perspectives, and enrich your mind. Find your next favorite read at our online bookstore. Welcome to a world where every page holds a new adventure!</p>
                    <button className={styles.button}>Read More</button>
                </div>
            </div>
        </div >
    )
}

export default Featured