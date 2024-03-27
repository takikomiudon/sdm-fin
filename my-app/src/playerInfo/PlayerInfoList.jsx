import PlayerInfo from "./PlayerInfo";

const PlayerInfoList = (props) => {
  return (
    <div>
      <table className="w-96">
        <thead>
          <tr>
            <th></th>
            <th>A社</th>
            <th>B社</th>
            <th>C社</th>
            <th>D社</th>
            <th>E社</th>
            <th>所持金</th>
          </tr>
        </thead>
        <tbody>
          <PlayerInfo player={props.player1} playerNumber={1} />
          <PlayerInfo player={props.player2} playerNumber={2} />
          <PlayerInfo player={props.player3} playerNumber={3} />
          <PlayerInfo player={props.player4} playerNumber={4} />
        </tbody>
      </table>
      
    </div>
  );
};

export default PlayerInfoList;
