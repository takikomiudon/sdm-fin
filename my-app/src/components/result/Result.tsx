import { Dialog, DialogTitle, List, ListItem } from "@mui/material";
import React from "react";
import { Player } from "../../types/player";

const Result = ({
  player1,
  player2,
  player3,
  player4,
  isFinished,
}: {
  player1: Player;
  player2: Player;
  player3: Player;
  player4: Player;
  isFinished: boolean;
}) => {
  const players = [player1, player2, player3, player4];

  return (
    <Dialog open={isFinished}>
      <DialogTitle>結果発表</DialogTitle>
      <List>
        {players.map((player) => (
          <ListItem key={player.name}>
            {player.name}: {player.money}万円
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
};

export default Result;
