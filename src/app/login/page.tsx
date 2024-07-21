"use client";

import React from "react";
import { auth, db } from "../../../libs/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const googleProvider = new GoogleAuthProvider();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log(user);

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      console.log(userDoc.data());

      if (userDoc.exists()) {
        console.log("ユーザーは既に存在します");
        router.push("/home");
      } else {
        console.log("新規ユーザーです。ユーザーを作成します");
        await setDoc(userDocRef, {
          nickName: user.displayName,
          photoURL: user.photoURL,
        });
        router.push("/signup");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signout = () => {
    signOut(auth);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold my-4">ログイン画面です</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={loginWithGoogle}
      >
        Googleでログイン
      </button>
      {user && <p>{user.displayName}でログイン中</p>}
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        onClick={signout}
      >
        サインアウト
      </button>
    </div>
  );
};

export default Page;
