import React from "react";
import PlayerInfo from "./PlayerInfo";
import { Player } from "../../types/player";
import ScienceIcon from '@mui/icons-material/Science';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ComputerIcon from '@mui/icons-material/Computer';
import PsychologyIcon from '@mui/icons-material/Psychology';

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
            <th><ScienceIcon /></th>
            <th><AccountBalanceWalletIcon /></th>
            <th><LocalShippingIcon /></th>
            <th><ComputerIcon /></th>
            <th><PsychologyIcon /></th>
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
