import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import StockSelectButton from "./StockSelectButton";
import claude from "../../claude/claude";
import { Player } from "../../types/player";
import events from "../../data/events";
import priceArray from "../../data/priceArray";
import stockName from "../../data/stockName";
import ScienceIcon from '@mui/icons-material/Science';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ComputerIcon from '@mui/icons-material/Computer';
import PsychologyIcon from '@mui/icons-material/Psychology';

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
  const [isLoading, setIsLoading] = useState(false);
  let updatedLogs = [...logs];
  let updatedStockPrices = [...stockPrices];

  const handleClick = async () => {
    setIsLoading(true);
    setMessage("");

    if (!validateTrade(playerStocks, player1.money)) {
      setMessage("所持金が足りません");
      setIsLoading(false);
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
      setIsLoading(false);
      return;
    }
    trade(claudeStocks, player2, setPlayer2);

    setLogs(updatedLogs);

    event();

    setStockPrices(updatedStockPrices);

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

    setIsLoading(false);
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

      for (let i = 0; i < 5; i++) {
        let stock = stocks[i];

        if (stock === 0) {
          continue;
        }

        const isBuy = stock > 0;
        stock = isBuy ? stock : -stock;

        let dealingPrice = 0;
        for (let j = 0; j < stock; j++) {
          dealingPrice +=
            priceArray[stockPrices[i] + (isBuy ? 0 : 1) + (isBuy ? -j : j)];
        }

        updatedPlayer.money -= dealingPrice;
        updatedPlayer.stocks[i] += isBuy ? stock : -stock;

        updatedStockPrices[i] += isBuy ? -stock : stock;

        updatedLogs.push({
          year: year,
          period: period,
          playerName: player.name,
          stockType: stockName[i],
          isBuy: isBuy,
          price: dealingPrice,
          quantity: stock,
        });
      }

      setPlayer(updatedPlayer);
    } catch (error) {
      console.error(error);
    }
  };

  const event = () => {
    for (let i = 0; i < 5; i++) {
      if (updatedStockPrices[i] - events[eventNum].effect[i] < 0) {
        updatedStockPrices[i] = 0;
      } else if (updatedStockPrices[i] - events[eventNum].effect[i] > 19) {
        updatedStockPrices[i] = 19;
      } else {
        updatedStockPrices[i] -= events[eventNum].effect[i];
      }
    }
  };

  return (
    <div className="StockSelector">
      <div className="flex flex-row justify-evenly">
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={0}
          icon={<ScienceIcon />}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={1}
          icon={<AccountBalanceWalletIcon />}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={2}
          icon={<LocalShippingIcon />}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={3}
          icon={<ComputerIcon />}
        />
        <StockSelectButton
          stocks={playerStocks}
          setStocks={setPlayerStocks}
          stockId={4}
          icon={<PsychologyIcon />}
        />
      </div>
      <div className="message">{message}</div>
      <Button
        variant="contained"
        sx={{ margin: "16px" }}
        onClick={handleClick}
        className="button"
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : "決定"}
      </Button>
    </div>
  );
};

export default StockSelector;