"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./loginPage.module.css";

const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <p className="text-center text-color text-xl">Sign in</p>
        <button
          className="px-8 py-4 font-medium bg-blue-500 rounded-full flex items-center gap-6 text-white"
          onClick={() => signIn('google')}
        >
          <span>Sign in with Google</span> <i className="nf nf-fa-google_plus text-2xl" />
        </button>
        <button className="px-8 py-4 font-medium bg-gray-700 rounded-full flex items-center gap-6 text-white"
          onClick={() => signIn('github')} >
          <span>Sign in with GitHub</span> <i className="nf nf-fa-github text-2xl" />
        </button>
      </div>
    </div >
  );
};

export default LoginPage;
