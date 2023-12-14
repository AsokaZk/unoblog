"use client";
import Image from "next/image";

import styles from "./SinglePage.module.css";
import { getSinglePost } from "@/lib/data";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Comment, Post } from "@/lib/definitions";
import moment from 'moment';

interface SinglePageProps {
  params: {
    slug: string;
  };
}

type FormValues = {
  postSlug: string
  desc: string
}

const SinglePage = ({ params: { slug } }: SinglePageProps) => {

  const { status } = useSession();
  const [post, setPost] = useState<Post>();
  const [comment, setComment] = useState<Comment>();
  const [value, setValue] = useState('');

  const { register, handleSubmit, reset } = useForm<FormValues>({ shouldUseNativeValidation: true });

  const onSubmit = handleSubmit(async (data: FormValues) => {
    fetch("http://localhost:3000/api/comments", {
      method: "POST",
      body: JSON.stringify({
        desc: data.desc,
        postSlug: slug,
      }),
    })
      .then((response) => {
        console.log({ response });
        reset();
        setComment(response);
      })
      .catch((error) => {
        console.log({ error });
      });
  });

  useEffect(() => {
    getSinglePost(slug)
      .then((data) => {
        if (data) {
          console.log(data);
          setPost(data);
        }
      })
      .catch(console.log);
  }, [comment]);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{post?.title}</h1>
          <div className={styles.user}>
            {post?.user?.image && (
              <div className={styles.userImageContainer}>
                <Image src={post?.user?.image} alt="" fill className={styles.avatar} />
              </div>
            )}
            <div className={styles.userTextContainer}>
              <span className={styles.username}>{post?.user?.name}</span>
              <span className={styles.date}>
                {post?.createdAt && new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        {post?.img && (
          <div className={styles.imageContainer}>
            <Image src={post.img} alt="" fill className={styles.image} />
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: post?.desc ?? '' }}
          />
        </div>


      </div>
      <div className="mt-5">
        <h3>Comments</h3>

        {status === "authenticated" && (
          <div className={styles.comments}>
            <form onSubmit={onSubmit}>
              <div className="relative">
                <input
                  {...register("desc", { required: "Please enter a comment." })}
                  placeholder="Write a comment..."
                  className={"block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                />
                <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send</button>
              </div>
            </form>
          </div>
        )
        }

        <div>
          <ul>
            {post?.comments &&
              post.comments.map((comment: Comment) => (
                <li key={comment.id}>
                  <div className="flex">
                    <div>
                      <Image
                        src={comment.user.image}
                        width={35}
                        height={35}
                        alt={"user-logo"}
                      ></Image>
                    </div>
                    <div className={styles.profile}>
                      <p className={styles.name}>{comment.user.name}</p>
                      <p className={styles.date}>{moment(comment.createdAt).fromNow()}</p>
                    </div>
                  </div>
                  <p>{comment.desc}</p>
                </li>
              ))}
          </ul>
        </div>
      </div >
    </div >
  );
};

export default SinglePage;
