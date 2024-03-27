import "./PlayerInfo.css";
import logo from "./img/logo192.png";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";

const PlayerInfo = (props) => {
  return (
    <div className="PlayerInfo">
      <img src={logo} />
      <p>持ち株: {props.player.stocks}</p>
      <p>所持金: {props.player.money}万円</p>
    </div>
  );
};

export default PlayerInfo;
