import React from "react";
import PlayerInfo from "./PlayerInfo";
import { Player } from "../../types/player";
import StockIcon from "../icons/StockIcon";
import logo1 from "./img/player_logo_1.png";
import logo2 from "./img/player_logo_2.png";
import logo3 from "./img/player_logo_3.png";
import logo4 from "./img/player_logo_4.png";

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
              <StockIcon id={0} size="60px"/>
            </th>
            <th>
              <StockIcon id={1} size="60px"/>
            </th>
            <th>
              <StockIcon id={2} size="60px"/>
            </th>
            <th>
              <StockIcon id={3} size="60px"/>
            </th>
            <th>
              <StockIcon id={4} size="60px"/>
            </th>
            <th>所持金</th>
          </tr>
        </thead>
        <tbody>
          <PlayerInfo player={player1} logo={logo1}/>
          <PlayerInfo player={player2} logo={logo2}/>
          <PlayerInfo player={player3} logo={logo3}/>
          <PlayerInfo player={player4} logo={logo4}/>
        </tbody>
      </table>
    </div>
  );
};

export default PlayerInfoList;
