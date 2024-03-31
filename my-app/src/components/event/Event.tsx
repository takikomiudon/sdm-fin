import React from "react";
import events from "../../data/events";

const Event = ({ eventNum }: { eventNum: number }) => {
  return (
    <div>
      <h1>イベント</h1>
      <h2>{events[eventNum].name}</h2>
      <p>
        A{events[eventNum].effect[0]}
        &nbsp;B{events[eventNum].effect[1]}
        &nbsp;C{events[eventNum].effect[2]}
        &nbsp;D{events[eventNum].effect[3]}
        &nbsp;E{events[eventNum].effect[4]}
      </p>
    </div>
  );
};

export default Event;
