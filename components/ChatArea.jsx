import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
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

  if (selectedUser) {
    const uid1 =
      displayName?.length > selectedUser?.length
        ? `${displayName + selectedUser}`
        : `${selectedUser + displayName}`;
    const ref = collection(db, "chats", uid1, "sms");
    const q = query(ref, orderBy("timeStamp", "asc"));

    onSnapshot(q, (qSnapShot) => {
      const user = [];
      qSnapShot.docs.forEach((doc) => {
        user.push(doc.data());
      });
      setAllMessage(user);
    });
  }

  return (
    <div className="col-span-3 relative h-screen">
      <div className="">
        {allMessage.map((item) => {
          const date = item?.timeStamp?.toDate();
          return (
            <div
              className="p-1"
              key={`${item?.timeStamp?.seconds + item?.timeStamp1?.nanoseconds}`}
            >
              <Message
                text={item.message}
                sender={item.sender}
                current={displayName}
                timestamp={`${date}`}
              />{" "}
            </div>
          );
        })}
      </div>
      <div className="absolute bottom-16 w-full  h-16 flex items-center rounded-lg">
        <input
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 h-full w-full rounded-l-lg"
          placeholder="Type a message..."
          value={message}
        />
        <button
          onClick={() => {
            if (selectedUser) {
              sendMessage();

              setMessage("");
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
