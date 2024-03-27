import PlayerInfo from "./PlayerInfo";

const PlayerInfoList = (props) => {
  return (
    <div>
      <PlayerInfo player={props.player1} playerNumber={1} />
      <PlayerInfo player={props.player2} playerNumber={2} />
      <PlayerInfo player={props.player3} playerNumber={3} />
      <PlayerInfo player={props.player4} playerNumber={4} />
    </div>
  );
};

export default PlayerInfoList;
