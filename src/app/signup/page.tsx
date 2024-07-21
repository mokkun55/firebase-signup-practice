// サインアップページ

"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [user] = useAuthState(auth);

  const [nickname, setNickname] = useState<string>("");
  const [userid, setUserid] = useState<string>("");

  // userが変更されたらnicknameを更新
  useEffect(() => {
    setNickname(user?.displayName || "");
  }, [user]);

  const changeUserId = (userId: string) => {
    userId = userId.replace(/[^a-zA-Z0-9]/g, "");
    console.log(userId);

    setUserid(userId);
  };

  const clickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(nickname, userid);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mt-4">サインアップ画面</h1>
      <p className="mb-4 font-bold underline">
        {user?.displayName}でログイン中
      </p>
      <form onSubmit={(e) => clickSubmit(e)} className="flex flex-col">
        <p>ニックネーム</p>
        <input
          type="text"
          placeholder="nickname"
          className="border rounded p-1"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        <p>ユーザーid</p>
        <input
          type="text"
          placeholder="userid"
          className="border rounded p-1"
          value={userid}
          onChange={(e) => changeUserId(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 p-1 rounded text-white mt-4"
        >
          完了
        </button>
      </form>
    </div>
  );
};

export default Page;
