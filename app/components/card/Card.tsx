import Image from "next/image";
import Link from "next/link";
import { Post } from "@/lib/definitions";

import styles from "./Card.module.css";

const Card = ({ post }: { post: Post }) => {
  return (
    <div className={styles.container} key={post.id}>
      {post?.img && (
        <div className={styles.imageContainer}>
          <Image src={post.img} alt={post.title} fill className={styles.image} />
        </div>
      )}
      <div className={styles.textContainer}>
        <div className={styles.detail}>
          <span className={styles.date}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })} -{" "}
          </span>
          <span className={styles.category}>{post.catSlug}</span>
        </div>
        <Link href={`/posts/${post.slug}`}>
          <h1>{post.title}</h1>
        </Link>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{ __html: post.desc.substring(0, 60) }}
        />
        <Link href={`/posts/${post.slug}`} className={styles.link}>
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
