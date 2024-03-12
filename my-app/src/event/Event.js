const Event = (props) => {
    
    return (
        <div>
        <h4 style={{ margin: 0 }}>イベント名</h4>
        <h2 style={{ margin: 0 }}>{props.props.eventNameArray[props.props.eventNum]}</h2>
        <h4 style={{ margin: 0 }}>
              A{(props.props.eventArray[props.props.eventNum])[0]}
        &nbsp;B{(props.props.eventArray[props.props.eventNum])[1]}
        &nbsp;C{(props.props.eventArray[props.props.eventNum])[2]}
        &nbsp;D{(props.props.eventArray[props.props.eventNum])[3]}
        &nbsp;E{(props.props.eventArray[props.props.eventNum])[4]}</h4>
        </div>
    );
}

export default Event;