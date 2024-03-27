const Event = (props) => {
  return (
    <div>
      <h4 style={{ margin: 0 }}>イベント</h4>
      <h2 style={{ margin: 0 }}>{props.eventNameArray[props.eventNum]}</h2>
      <h4 style={{ margin: 0 }}>
        A{props.eventArray[props.eventNum][0]}
        &nbsp;B{props.eventArray[props.eventNum][1]}
        &nbsp;C{props.eventArray[props.eventNum][2]}
        &nbsp;D{props.eventArray[props.eventNum][3]}
        &nbsp;E{props.eventArray[props.eventNum][4]}
      </h4>
    </div>
  );
};

export default Event;
