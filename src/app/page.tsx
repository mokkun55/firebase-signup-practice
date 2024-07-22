import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold m-4">ルートディレクトリ</h1>
      <Link href={"/login"} className="text-blue-700 underline">
        ログインページへ
      </Link>
    </div>
  );
};

export default Page;
