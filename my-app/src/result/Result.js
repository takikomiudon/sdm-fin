const Result = ({ props }) => {
    if (props.isFinished) {
        return (
            <div>
                <h1>Result</h1>
                <p>Player1: {props.player1.money}万円</p>
                <p>Player2: {props.player2.money}万円</p>
                <p>Player3: {props.player3.money}万円</p>
                <p>Player4: {props.player4.money}万円</p>
            </div>
        );
    }
}

export default Result;