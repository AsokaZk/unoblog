"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ReactQuill from "react-quill";
import { type Category } from "@prisma/client";
import { getCategories, uploadToCloudinary } from "@/lib/data";
import { useForm } from "react-hook-form"

import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import Placeholder from "./placeholder";

type FormValues = {
  title: string
  description: string
  url: string
}

const WritePage = () => {
  const { status } = useSession();
  const router = useRouter();

  const ref = useRef<any>();

  const { register, handleSubmit } = useForm<FormValues>({ shouldUseNativeValidation: true })

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [file, setFile] = useState<File | null | undefined>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [catSlug, setCatSlug] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    getCategories().then(setCategoryList);
  }, []);


  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    await uploadFileCloud();
    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        desc: data.description,
        img: imagePreviewUrl,
        slug: slugify(data.title),
        catSlug: catSlug || "style", //If not selected, choose the general category
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      router.push(`/posts/${data.slug}`);
    }
    setIsLoading(false);
  });

  useEffect(() => {
    const uploadFile = async () => {
      if (file && !isLoading) {
        try {
          const url = URL.createObjectURL(file);
          if (url) {
            setImagePreviewUrl(url);
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        }
      }
    };

    void uploadFile();

  }, [file]);

  const uploadFileCloud = async () => {
    if (file) {
      try {
        const url = await uploadToCloudinary(file);
        setImagePreviewUrl(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const uploadFile = () => {
    ref.current?.click();
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Placeholder />
      ) : (
        <form onSubmit={onSubmit}>
          <div className={styles.header}>
            <input
              {...register("title", { required: "Please enter title." })}
              placeholder="Title"
              className={styles.input}
            />

            <div className={styles.options}>
              <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)} >
                <option value="">Category</option>
                {categoryList.map((item) => (
                  <option value={item.slug} key={item.id}>{item.title}</option>
                ))}
              </select>

              <button className={styles.publish} type="submit" disabled={isLoading}>
                Publish
              </button>
            </div>
          </div>

          <div className={styles.uploadImageContainer}>
            <input
              ref={ref}
              id="image"
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files ? e.target.files[0] : null;
                setFile(file);
              }}
              style={{ display: "none" }}
            />
            {imagePreviewUrl ? (
              <Image
                src={imagePreviewUrl}
                alt="Uploaded Image"
                width={1200}
                height={700}
                onClick={uploadFile}
                className={styles.imagePreview}
              />
            ) : (
              <Image
                src="/upload.svg"
                alt="Upload Image"
                width={1200}
                height={700}
                onClick={uploadFile}
                className={styles.uploadImageSvg}
              />
            )}
          </div>

          <div className={styles.editor}>
            <input
              {...register("description")}
              className={styles.textArea}
              placeholder="Write here..."
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default WritePage;
