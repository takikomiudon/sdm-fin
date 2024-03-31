import React from "react";
import logo from "./img/logo192.png";
import { Player } from "../../types/player";

const PlayerInfo = ({ player }: { player: Player }) => {
  return (
    <tr>
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
