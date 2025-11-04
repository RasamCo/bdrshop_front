import Link from "next/link";
import React from "react";

const notFound = () => {
  return (
    <div>
      این صحفه یافت نشد به صحفه اصلی برگردید
      <Link href={"/"}>برگشت به صحفه اصلی</Link>
    </div>
  );
};

export default notFound;