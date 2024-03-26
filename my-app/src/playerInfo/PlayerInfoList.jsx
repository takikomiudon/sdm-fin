import PlayerInfo from "./PlayerInfo";

const PlayerInfoList = (props) => {
  return (
    <div>
      <PlayerInfo props={{ player: props.props.player1, playerNumber: 1 }} />
      <PlayerInfo props={{ player: props.props.player2, playerNumber: 2 }} />
      <PlayerInfo props={{ player: props.props.player3, playerNumber: 3 }} />
      <PlayerInfo props={{ player: props.props.player4, playerNumber: 4 }} />
    </div>
  );
};

export default PlayerInfoList;
