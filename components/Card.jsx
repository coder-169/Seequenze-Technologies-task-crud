import { useGlobalHook } from "@/states/Context";
import React from "react";

const Card = ({ url, author, id }) => {
  const { setEdit, setCardDetails, setOpenDetailModal } =
    useGlobalHook();
  const handleClick = () => {
    console.log("clicked");
    setOpenDetailModal(true);
    setEdit(false);
    setCardDetails({
      url,
      author,
      id,
    });
  };
  return (
    <div className="bg-white text-center col-span-6 sm:col-span-6 lg:col-span-4  px-5 py-2 rounded-lg">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="cursor-pointer"
        onClick={handleClick}
        src={url}
        alt={author}
      />
    </div>
  );
};

export default Card;
