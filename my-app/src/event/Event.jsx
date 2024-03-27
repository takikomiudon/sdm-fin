const Event = (props) => {
  return (
    <div>
      <h1>イベント</h1>
      <h2>{props.eventNameArray[props.eventNum]}</h2>
      <p>
        A{props.eventArray[props.eventNum][0]}
        &nbsp;B{props.eventArray[props.eventNum][1]}
        &nbsp;C{props.eventArray[props.eventNum][2]}
        &nbsp;D{props.eventArray[props.eventNum][3]}
        &nbsp;E{props.eventArray[props.eventNum][4]}
      </p>
    </div>
  );
};

export default Event;
