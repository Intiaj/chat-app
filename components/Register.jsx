/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { signInAnonymously } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, where, query, collection, getDocs } from "firebase/firestore";

function Register() {
  const signUpAnonymously = async (userName) => {
    signInAnonymously(auth)
      .then((res) => {
        setDoc(doc(db, "users", `${userName}`), {
          uid: res?.user?.uid,
          displayName: userName,
          createdAt: res?.user?.metadata?.creationTime,
          lastSignIn: res?.user?.metadata?.lastSignInTime,
          displayPhoto: `https://robohash.org/${res?.user?.uid}.png`,
        },{
          merge: true
        }).catch((err) => console.log(err.message));
      })
      .catch((err) => console.log(err.message));
  };

  const loginHandler = async(userName) => {
    const userRef = collection(db, 'users');
    const q = query(userRef, where("displayName", "==", `${userName}`));
    const a = await getDocs(q);
    a.docs.forEach((doc) => {
      if(doc.exists) {
        signUpAnonymously(userName);
      }
    })
    
  };
  const [userName1, setUserName1] = useState("");
  const [userName2, setUserName2] = useState("");
  const [logInSwitch, setLoginSwitch] = useState(false);
  return (
    <div className="min-h-screen min-w-full flex flex-col justify-center items-center mx-2 mt-12 lg:mt-0">
      <div className="border h-fit w-fit grid lg:grid-cols-2 rounded-lg shadow-md">
        <div className="col-span-1 flex flex-col justify-center items-center">
          {!logInSwitch ? (
            <div className="flex flex-col">
              <h1 className="text-base font-semibold pb-12 text-center">
                <span className="text-3xl text-blue-500 font-bold">
                  Welcome!{" "}
                </span>
                <br />
                Please enter a username to continue.
              </h1>
              <input
                onChange={(e) => setUserName1(e.target.value)}
                className="h-12 w-auto border rounded-md"
              />
              <button
                onClick={() => signUpAnonymously(userName1)}
                className="px-12 bg-blue-400 mt-12 text-white text-lg font-semibold rounded-lg py-2 shadow-md hover:brightness-95"
              >
                Register
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-3xl text-blue-500 font-bold pb-12">
                Welcome,
                <br />
                <span className="text-base text-black font-semibold ">
                  Enter your username to login.
                </span>
              </p>

              <input
                className="h-12 w-auto border rounded-md"
                onChange={(e) => setUserName2(e.target.value)}
              />

              <button
                className="px-12 bg-blue-400 mt-12 text-white text-lg font-semibold rounded-lg py-2 shadow-md hover:brightness-95"
                onClick={() => loginHandler(userName2)}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div className="col-span-1 p-4 rounded">
          <img
            className="lg:rounded-r-lg rounded-md"
            src="https://i.pinimg.com/550x/0a/c7/82/0ac78255854d1f5324dcea1bd2209025.jpg"
            alt=""
          />
        </div>
      </div>

      <p>{!logInSwitch ? "Already a user?" : "Dont have a accout?"}</p>
      <button
        onClick={() => setLoginSwitch(!logInSwitch)}
        className="px-12 bg-blue-400 mt-2 text-white text-lg font-semibold rounded-lg py-2 shadow-md hover:brightness-95"
      >
        {!logInSwitch ? "Login" : "Register"} instead
      </button>
    </div>
  );
}

export default Register;
