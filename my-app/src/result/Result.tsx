import React from "react";
import { Player } from "../types/player";

const Result = ({
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
      <h1>結果発表</h1>
      <p>Player1: {player1.money}万円</p>
      <p>Player2: {player2.money}万円</p>
      <p>Player3: {player3.money}万円</p>
      <p>Player4: {player4.money}万円</p>
    </div>
  );
};

export default Result;
