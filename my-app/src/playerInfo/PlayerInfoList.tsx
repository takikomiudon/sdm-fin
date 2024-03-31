import React from "react";
import PlayerInfo from "./PlayerInfo";
import { Player } from "../types/player";

const PlayerInfoList = ({
  player1,
  player2,
  player3,
  player4,
}: {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
}) => {
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
          <PlayerInfo player={player1} />
          <PlayerInfo player={player2} />
          <PlayerInfo player={player3} />
          <PlayerInfo player={player4} />
        </tbody>
      </table>
    </div>
  );
};

export default PlayerInfoList;
