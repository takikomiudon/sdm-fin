import logo from "./img/logo192.png";

const PlayerInfo = (props) => {
  return (
    <tr>
      <td><img src={logo} className="h-12" alt="logo" /></td>
      <td>{props.player.stocks[0]}</td>
      <td>{props.player.stocks[1]}</td>
      <td>{props.player.stocks[2]}</td>
      <td>{props.player.stocks[3]}</td>
      <td>{props.player.stocks[4]}</td>
      <td>{props.player.money}万円</td>
    </tr>
  );
};

export default PlayerInfo;
