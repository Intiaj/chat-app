import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import Message from "./Message";


function ChatArea({ displayName }) {
  const selectedUser = useSelector((state) => state.user.user);
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  const sendMessage = async () => {
    const uid1 =
      displayName.length > selectedUser.length
        ? `${displayName + selectedUser}`
        : `${selectedUser + displayName}`;
    if (message.length) {
      const colRef = collection(db, "chats", `${uid1}`, "sms");
      await addDoc(colRef, {
        message,
        sender: displayName,
        timeStamp: serverTimestamp(),
      });
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const getAllMessages = async () => {
    const uid1 =
    displayName.length > selectedUser.length
        ? `${displayName + selectedUser}`
        : `${selectedUser + displayName}`;
    const ref = collection(db, "chats", uid1, "sms");
    const q = query(ref, orderBy("timeStamp", "asc"));
    const ss = await getDocs(q);
    const allMessages = [];
    ss.docs.forEach((res) => {
      allMessages.push(res.data());
      setAllMessage(allMessages);
    });
  };

  return (
    <div className="col-span-3 relative h-screen">
      <div className="">
        {allMessage.map((item) => (
          <Message
            key={item.message}
            text={item.message}
            sender={item.sender}
            current={displayName}
          />
        ))}
      </div>
      <div className="absolute bottom-16 w-full  h-16 flex items-center rounded-lg">
        <input
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 h-full w-full rounded-l-lg"
          placeholder="Type a message..."
        />
        <button
          onClick={() => {
            if (selectedUser) {
              sendMessage();
              getAllMessages();
              setMessage('')
            }
          }}
          className="bg-green-400 h-full w-24 flex flex-col items-center justify-center text-white font-bold hover:brightness-95 rounded-r-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatArea;
