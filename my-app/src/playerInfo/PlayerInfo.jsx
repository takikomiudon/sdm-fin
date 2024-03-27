import logo from "./img/logo192.png";

const PlayerInfo = (props) => {
  return (
    <div className="flex flex-row justify-evenly items-center">
      <img src={logo} className="h-12" alt="logo" />
      <p>持ち株: {props.player.stocks[0]} {props.player.stocks[1]} {props.player.stocks[2]} {props.player.stocks[3]} {props.player.stocks[4]}</p>
      <p>所持金: {props.player.money}万円</p>
    </div>
  );
};

export default PlayerInfo;
