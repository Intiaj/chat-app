import React from "react";

function Message({ sender, text, current, timestamp }) {
  return (
    <div className="w-full reletive">
      <div
        className={
          current === sender
            ? "w-1/4 bg-green-300 border rounded-xl px-4 text-xl font-bold flex flex-col text-left"
            : "relative text-xl font-bold flex flex-col"
        }
      >
        <div
          className={
            !(current === sender)
              ? "absolute right-1 rounded-xl bg-blue-200 p-2 w-1/4 text-right"
              : null
          }
        >
          <p>{text}</p>
          <p className="font-semibold text-xs">Sent at {timestamp.slice(16, 25)}</p>
        </div>
      </div>
    </div>
  );
}

export default Message;
