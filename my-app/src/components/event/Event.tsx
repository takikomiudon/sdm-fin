import React from "react";
import events from "../../data/events";
import StockIcon from "../icons/StockIcon";

const Event = ({ eventNum }: { eventNum: number }) => {
  if (eventNum > 15) {
    return null;
  }
  return (
    <div>
      <h1>イベント</h1>
      <h2>{events[eventNum].name}</h2>
      <p className="flex flex-row justify-evenly">
        <StockIcon id={0} />
        {events[eventNum].effect[0] > 0 ? "+" : ""}
        {events[eventNum].effect[0]}
        <StockIcon id={1} />
        {events[eventNum].effect[1] > 0 ? "+" : ""}
        {events[eventNum].effect[1]}
        <StockIcon id={2} />
        {events[eventNum].effect[2] > 0 ? "+" : ""}
        {events[eventNum].effect[2]}
        <StockIcon id={3} />
        {events[eventNum].effect[3] > 0 ? "+" : ""}
        {events[eventNum].effect[3]}
        <StockIcon id={4} />
        {events[eventNum].effect[4] > 0 ? "+" : ""}
        {events[eventNum].effect[4]}
      </p>
    </div>
  );
};

export default Event;
