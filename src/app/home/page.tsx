"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../../libs/firebase";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { UserData } from "../types/UserData";

const Page = () => {
  const [user, loading] = useAuthState(auth);

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const getUserDatas = async () => {
      if (!user) return;
      const userDataDoc = doc(db, "users", user?.uid);
      const userDatas = (await getDoc(userDataDoc)).data();
      setUserData(userDatas as UserData);
    };

    getUserDatas();
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">ホーム</h1>
      <Link href={"/login"} className="text-blue-700 underline">
        ログイン画面へ
      </Link>
      <div className="flex flex-col items-center justify-center bg-blue-100 p-8 rounded m-4">
        <h1 className="text-2xl font-bold mb-2">自分のプロフィール</h1>
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            <Image
              src={userData?.photoURL || ""}
              alt="プロフ画像"
              width={100}
              height={100}
              className="rounded-full border-2 border-gray-200"
            />
            <p>google垢: {user?.displayName}</p>
            <p>uid(自動): {user?.uid}</p>
            <p>ニックネーム: {userData?.nickName}</p>
            <p>ユーザーID: @{userData?.userId}</p>
            <p>自己紹介文: {userData?.bio}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Page;
