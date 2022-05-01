/* eslint-disable @next/next/no-img-element */
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useSelector } from "react-redux";

function Header({ displayPhoto, displayName }) {
  const selectedUser = useSelector((state) => state.user.user);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient( 102.4deg,  rgba(253,189,85,1) 7.8%, rgba(249,131,255,1) 100.3% )",
      }}
      className="grid grid-cols-4 pl-2 py-2 "
    >
      <div className="col-span-1 border-r border-gray-500">
        <div className="flex items-center">
          <img
            src={
              displayPhoto
                ? `${displayPhoto}`
                : "https://www.pinclipart.com/picdir/middle/547-5474602_character-avatar-clipart.png"
            }
            placeholder=""
            alt=""
            className="rounded-full h-12 w-12 bg-cyan-300"
          />
          <h1 className="font-bold ml-2">{displayName}</h1>
        </div>
      </div>

      <div className="col-span-3">
        <div className="flex items-center justify-between mx-4">
          <div className="flex items-center">
            <img
              src={`https://www.robohash.org/${selectedUser}`}
              placeholder=""
              alt=""
              className="rounded-full h-12 w-12 bg-cyan-400"
            />
            <h1 className="font-bold ml-2">{selectedUser}</h1>
          </div>
          <div
            onClick={() => signOut(auth)}
            className="flex flex-col items-center hover:text-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <p className="font-semibold text-sm">Signout</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
