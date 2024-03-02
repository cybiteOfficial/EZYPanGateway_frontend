import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import UserProfileCard from "./UserProfileCard/UserProfileCard";
import SearchSRNWrapper from "./SearchSRN/SearchSRNWrapper";

interface Props {
  toggleCollapse: () => void;
}


export type UserData = { userName: string; email: string; type: string };

const Header = ({ toggleCollapse }: Props) => {
  const [isShowProfileCard, setIsShowProfileCard] = useState(false);


  const userData: UserData =
    localStorage.getItem("userData") !== "undefined" &&
    JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <div className="grid grid-cols-2  shadow-lg pb-1">
      {/* Menu Icon */}
      <button
        type="button"
        onClick={toggleCollapse}
        className="text-xl text-slate-500 px-3 block md:hidden "
      >
        <HiMenu className="text-2xl text-slate-500" />
      </button>
      <div className="">

      </div>

      {/* Right Section */}
      <div className="flex gap-4 col-start-2 justify-end items-center px-4">
        <SearchSRNWrapper/>
        <button
          onClick={() =>
            setIsShowProfileCard((isShowProfileCard) => !isShowProfileCard)
          }
          className="flex gap-5"
        >
          <div className="h-[35px] w-[35px] flex justify-center items-center font-bold bg-primary-main text-white  rounded-full">
            {userData?.userName?.[0]?.toUpperCase()}
          </div>
        </button>
        {isShowProfileCard && (
          <UserProfileCard
            onClickAway={() => setIsShowProfileCard(false)}
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
