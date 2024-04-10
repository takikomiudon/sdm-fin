import React from "react";
import PlayerInfo from "./PlayerInfo";
import { Player } from "../../types/player";
import StockIcon from "../icons/StockIcon";

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
            <th>
              <StockIcon id={0} />
            </th>
            <th>
              <StockIcon id={1} />
            </th>
            <th>
              <StockIcon id={2} />
            </th>
            <th>
              <StockIcon id={3} />
            </th>
            <th>
              <StockIcon id={4} />
            </th>
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
