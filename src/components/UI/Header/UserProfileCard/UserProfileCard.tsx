import React from "react";
import  ClickAwayListener  from '@mui/material/ClickAwayListener'
import { MdOutlineLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetState } from "src/redux/slices/AuthSlice";
import { UserData } from "../Header";
import { clearLocalStorage } from "src/utils/auth/authUtils";

type UserProfileCardPropTypes = {
  onClickAway: () => void;
  userData: UserData;
};

const UserProfileCard = ({
  onClickAway,
  userData,
}: UserProfileCardPropTypes) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className="absolute top-[53px] rigth-[20px] w-[290px] border border-slate-300 shadow-lg rounded animate-[fade_0.5s_ease-in-out] z-[1000]  ">
        <div className="flex gap-5 items-center  bg-slate-50 h-[70px] px-4 border-b border-slate-300">
          <div className="w-[38px] h-[38px] flex justify-center items-center bg-primary-main rounded-full text-white font-medium ">
            {userData?.userName?.[0]?.toUpperCase()}
          </div>

          <div className="">
            <div className="text-slate-700"> {userData?.userName} </div>
            <div className="text-sm text-slate-500"> {userData?.email} </div>
          </div>
        </div>

        <div className="border-t border-slate-300 px-7 py-3 bg-white">
          <div className="flex gap-3  text-slate-500 items-center hover:text-primary-main cursor-pointer">
            <MdOutlineLogout className="text-xl" />
            <div
              className=""
              onClick={() => {
                clearLocalStorage();
                dispatch(resetState());
                navigate("/login");
              }}
            >
              {" "}
              Sign out{" "}
            </div>
          </div>
        </div>
      </div>
    </ClickAwayListener>
  );
};

export default UserProfileCard;
