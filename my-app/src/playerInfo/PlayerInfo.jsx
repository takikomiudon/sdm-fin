import logo from "./img/logo192.png";

const PlayerInfo = (props) => {
  return (
    <div className="flex flex-row justify-evenly">
      <img src={logo} className="h-12" alt="logo"/>
      <p>持ち株: {props.player.stocks}</p>
      <p>所持金: {props.player.money}万円</p>
    </div>
  );
};

export default PlayerInfo;
