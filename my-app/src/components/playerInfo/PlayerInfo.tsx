import React from "react";
import { Player } from "../../types/player";

interface PlayerInfoProps {
  player: Player;
  logo: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({ player, logo }) => {
  return (
    <tr style={player.name === "あなた" ? { backgroundColor: "#35599c" } : {}}>
      <td>
        <img src={logo} className="h-12" alt="logo" />
      </td>
      <td>{player.stocks[0]}</td>
      <td>{player.stocks[1]}</td>
      <td>{player.stocks[2]}</td>
      <td>{player.stocks[3]}</td>
      <td>{player.stocks[4]}</td>
      <td>{player.money}万円</td>
    </tr>
  );
};

export default PlayerInfo;
