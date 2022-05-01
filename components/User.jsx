/* eslint-disable @next/next/no-img-element */
import React from "react";

function User({name}) {
  return (
    <div className="h-20 border pl-2">
      <div className="h-12 w-12 rounded-full flex items-center my-4">
        <img
          src={`https://robohash.org/${name}`}
          placeholder=""
          alt=""
          className="rounded-full bg-lime-200 mr-4"
        />
        <div className="">
          <h1 className="font-bold">{name}</h1>
          
        </div>
      </div>
    </div>
  );
}

export default User;
