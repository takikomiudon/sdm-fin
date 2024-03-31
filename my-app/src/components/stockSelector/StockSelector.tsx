import React, { useState } from "react";
import { Button } from "@mui/material";
import StockSelectButton from "./StockSelectButton";
import claude from "../../claude/claude";
import { Player } from "../../types/player";
import events from "../../data/events";
import priceArray from "../../data/priceArray";

const StockSelector = ({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  player3,
  setPlayer3,
  player4,
  setPlayer4,
  stockPrices,
  setStockPrices,
  year,
  setYear,
  period,
  setPeriod,
  setIsFinished,
  logs,
  setLogs,
  eventNum,
  setEventNum,
}: {
  player1: Player;
  setPlayer1: React.Dispatch<React.SetStateAction<Player>>;
  player2: Player;
  setPlayer2: React.Dispatch<React.SetStateAction<Player>>;
  player3: Player;
  setPlayer3: React.Dispatch<React.SetStateAction<Player>>;
  player4: Player;
  setPlayer4: React.Dispatch<React.SetStateAction<Player>>;
  stockPrices: number[];
  setStockPrices: React.Dispatch<React.SetStateAction<number[]>>;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  period: number;
  setPeriod: React.Dispatch<React.SetStateAction<number>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  logs: any[];
  setLogs: React.Dispatch<React.SetStateAction<any[]>>;
  eventNum: number;
  setEventNum: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [playerStocks, setPlayerStocks] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState("");

  const handleClick = async () => {
    if (!validateTrade(playerStocks, player1.money)) {
      setMessage("所持金が足りません");
      return;
    }
    trade(playerStocks, player1, setPlayer1);
    initialTrade();

    let claudeStocks = await claude(
      stockPrices,
      player2,
      events[eventNum].effect,
      year,
      period
    );
    if (!validateTrade(claudeStocks, player2.money)) {
      console.log("claudeの所持金が足りません");
      claudeStocks = [0, 0, 0, 0, 0];
      return;
    }
    trade(claudeStocks, player2, setPlayer2);

    event();

    if (year === 4 && period === 4) {
      setIsFinished(true);
    } else if (period === 4) {
      setYear(year + 1);
      setPeriod(1);
      // TODO 配当金の実装
    } else {
      setPeriod(period + 1);
    }

    setEventNum(eventNum + 1);
  };

  const validateTrade = (stocks: number[], money: number) => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += stockPrices[i] * stocks[i];
    }

    return sum <= money;
  };

  const initialTrade = () => {
    setPlayerStocks([0, 0, 0, 0, 0]);
  };

  const trade = (
    stocks: number[],
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
  ) => {
    try {
      let updatedPlayer = JSON.parse(JSON.stringify(player));
      let updatedLogs = [...logs];

      for (let i = 0; i < 5; i++) {
        let stock = stocks[i];

        if (stock === 0) {
          continue;
        }

        const isBuy = stock > 0;
        stock = isBuy ? stock : -stock;

        let dealingPrice = 0;
        for (let j = 0; j < stock; j++) {
          dealingPrice += priceArray[stockPrices[i] + (isBuy ? 0 : 1) + (isBuy ? -j : j)];
        }

        updatedPlayer.money -= dealingPrice;
        updatedPlayer.stocks[i] += isBuy ? stock : -stock;

        setStockPrices((currentPrices) => {
          const updatedPrices = [...currentPrices];
          updatedPrices[i] += isBuy ? -stock : stock;
          return updatedPrices;
        });

        updatedLogs.push({
          year: year,
          period: period,
          playerName: player.name,
          stockType: `stock${i}`,
          isBuy: isBuy,
          price: dealingPrice,
          quantity: stock,
        });
      }

      setPlayer(updatedPlayer);
      setLogs(updatedLogs);
    } catch (error) {
      console.error(error);
    }
  };

  const event = () => {
    setStockPrices((currentPrices) => {
      const newPrices = [...currentPrices];
      for (let i = 0; i < 5; i++) {
        if (newPrices[i] - events[eventNum].effect[i] < 0) {
          newPrices[i] = 0;
        } else if (newPrices[i] - events[eventNum].effect[i] > 19) {
          newPrices[i] = 19;
        } else {
          newPrices[i] -= events[eventNum].effect[i];
        }
      }
      return newPrices;
    });
  };

  return (
    <div className="StockSelector">
      <div className="flex flex-row justify-evenly">
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={0}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={1}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={2}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={3}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={4}
        />
      </div>
      <div className="message">{message}</div>
      <Button
        variant="contained"
        sx={{ margin: "16px" }}
        onClick={handleClick}
        className="button"
      >
        決定
      </Button>
    </div>
  );
};

export default StockSelector;
