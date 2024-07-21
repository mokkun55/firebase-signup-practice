import React from "react";
import Link from "next/link";
const page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">ホーム</h1>
      <Link href={"/login"} className="text-blue-700 underline">
        ログイン画面へ
      </Link>
    </div>
  );
};

export default page;
