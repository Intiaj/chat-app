import React, { useState, useEffect } from "react";
import UsersList from "./UsersList";
import User from "./User";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "../app/slice/selectedUserSlice";

let allUsers = [];

function Sidebar({ displayName }) {
  const [openChat, setOpenChat] = useState(false);
  const dispatch = useDispatch();
  const selectedUserName = useSelector((state) => state.user.user);

  const initChat = async () => {
    const uuid =
      displayName.length > selectedUserName.length
        ? `${displayName + selectedUserName}`
        : `${selectedUserName + displayName}`;
    const ref = doc(db, "chats", uuid);
    await setDoc(
      ref,
      {
        createAt: serverTimestamp(),
        user1: displayName,
        user2: selectedUserName,
      },
      { merge: true }
    );
  };

  const onlyUnique = [...new Set(allUsers)];
  useEffect(() => {
    getAllUserData();
  }, []);
  const getAllUserData = async () => {
    const colRef = collection(db, "users");
    const snapshot = await getDocs(colRef);
    snapshot.forEach((doc) => {
      if (doc.exists()) {
        allUsers.push(doc.data().displayName);
      }
    });
  };

  return (
    <div className="max-w-sm border-2 border-red-400 col-span-1 overflow-y-scroll">
      {openChat ? (
        <div className="absolute top-1/2 left-1/2 bg-white border rounded-lg w-1/4 mx-auto z-50">
          <p className="text-lg font-semibold text-center">Start a new chat</p>
          {onlyUnique
            .filter((item) => item !== displayName)
            .map((item) => (
              <div
                key={item}
                className="hover:brightness-95 cursor-pointer"
                onClick={() => {
                  dispatch(selectedUser(item));

                  if (selectedUserName) {
                    initChat();
                    setOpenChat(false);
                  }
                }}
              >
                <User name={item} />
              </div>
            ))}
        </div>
      ) : null}
      <div className="flex justify-between flex-col w-full">
        <div className="">
          <UsersList name={displayName} />
        </div>

        <div className=" bg-blue-400 rounded-lg mx-4">
          <button
            onClick={() => {
              setOpenChat(!openChat);
            }}
            className="border flex justify-center items-center w-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white bg-blue-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
