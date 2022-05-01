import React, { useEffect } from "react";
import User from "./User";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { selectedUser } from "../app/slice/selectedUserSlice";

let allUsers = [];

function UsersList({ name }) {
  const user = useSelector((state) => state.user.user);
  const onlyUnique = [...new Set(allUsers)];
  useEffect(() => {
    getAllUserData();
  }, [user]);
  const getAllUserData = async () => {
    const colRef = collection(db, "chats");
    const snapshot = await getDocs(colRef);
    snapshot.forEach((doc) => {
      if (doc.exists() && user) {
        if (doc.data().user1 === user) {
          allUsers.push(doc.data().user1);
        }

        allUsers.push(doc.data().user2);
      }
    });
  };



  const dispatch = useDispatch();
  return allUsers.length ? (
    <div className="h-full ">
      {onlyUnique
        .filter((item) => item !== name)
        .map((item) => (
          <div
          className="cursor-pointer"
            key={item}
            onClick={() => {
              dispatch(selectedUser(item));
              
            }}
          >
            <User name={item} />
          </div>
        ))}
    </div>
  ) : (
    <p className="text-xl font-bold text-center p-4">No chat initiated</p>
  );
}

export default UsersList;
