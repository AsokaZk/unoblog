
import React from 'react'
import Image from 'next/image'

import styles from './Featured.module.css'

const Featured = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <b className={styles.title2}>Hello there!</b> Discover the latest anime news.
            </h1>
            <div className={styles.post}>
                <div className={styles.imageContainer}>
                    <Image src="https://res.cloudinary.com/delpnrpse/image/upload/v1702581393/maxresdefault_bibixy.jpg" alt="" fill className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.postTitle}>A News Corner for Anime Lovers</h2>
                    <p className={styles.postDesc}>
                        AnimeBeat is your premier destination for all things anime news. Dive into the latest news, series updates, emerging trends, and discover hidden gems from the world of Japanese animation. Stay up to date with everything related to your favorite animes and discover new experiences that will captivate you. AnimeBeat: Where the passion for anime finds its source of inspiration.</p>
                    <button className={styles.button}>Read More</button>
                </div>
            </div>
        </div >
    )
}

export default Featured