// サインアップページ

"use client";

import React, { useEffect, useState } from "react";
import { auth, db } from "../../../libs/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { UserData } from "../types/UserData";

const Page: React.FC = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const [nickname, setNickname] = useState<string>("");
  const [userid, setUserId] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  // userが変更されたらnicknameを更新
  useEffect(() => {
    setNickname(user?.displayName || "");
  }, [user]);

  // ユーザーidチェック
  const changeUserId = (userId: string) => {
    userId = userId.replace(/[^a-zA-Z0-9]/g, "");
    // console.log(userId);

    setUserId(userId);
  };

  const checkUserId = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const clickSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(nickname, userid);

    if (userid === "") {
      alert("ユーザーidを入力してください");
      return;
    }

    const setData: Pick<UserData, "nickName" | "userId" | "bio"> = {
      nickName: nickname,
      userId: userid,
      bio: bio ? bio : "未設定",
    };

    try {
      if (!user) {
        alert("ログインしていません");
        return;
      }
      // ユーザーidが重複していないかチェック
      const userDocCollection = collection(db, "users");
      const q = query(collection(db, "users"), where("userId", "==", userid));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        alert("ユーザーidが重複しています");
        return;
      }

      setDoc(doc(db, `users/${user.uid}`), setData, { merge: true });
    } catch (error) {
      console.error(error);
    }

    router.push("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mt-4">サインアップ画面</h1>
      <p className="mb-4 font-bold underline">
        {user?.displayName}でログイン中 ({user?.uid})
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
        <p
          onClick={checkUserId}
          className="p-1 bg-blue-500 text-white rounded mb-2"
        >
          重複チェック
        </p>
        <p>自己紹介(省略可)</p>
        <textarea
          placeholder="省略可"
          className="border rounded p-1"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
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
