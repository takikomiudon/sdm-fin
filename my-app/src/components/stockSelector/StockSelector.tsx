import React, { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import StockSelectButton from "./StockSelectButton";
import claude from "../../claude/claude";
import { Player } from "../../types/player";
import events from "../../data/events";
import priceArray from "../../data/priceArray";
import stockName from "../../data/stockName";
import ScienceIcon from "@mui/icons-material/Science";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ComputerIcon from "@mui/icons-material/Computer";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { Log } from "../../types/log";

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
  logs: Log[];
  setLogs: React.Dispatch<React.SetStateAction<Log[]>>;
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

    updatedLogs.push({
      year: year,
      period: period,
      logs: [],
    });

    if (!validateTrade(playerStocks, player1, updatedStockPrices)) {
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
    if (!validateTrade(claudeStocks, player2, updatedStockPrices)) {
      claudeStocks = [0, 0, 0, 0, 0];
      setIsLoading(false);
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

  const validateTrade = (stocks: number[], player: Player, updatedStockPrices: number[]) => {
    let sum = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < Math.abs(stocks[i]); j++) {
        if (stocks[i] > 0) {
          sum += priceArray[updatedStockPrices[i] - j];
        } else if (stocks[i] < 0) {
          sum -= priceArray[updatedStockPrices[i] + 1 + j];
        }
      }
    }

    if (sum > player.money) {
      if (player.name === "あなた") {
        setMessage(`所持金が足りません 取引金額:${sum}万円`);
      } else {
        console.log("所持金が足りません");
      }
      return false;
    }

    for (let i = 0; i < 5; i++) {
      if (player.stocks[i] + stocks[i] < 0) {
        if (player.name === "あなた") {
          setMessage("持ち株数を上回る売却はできません");
        } else {
          console.log("持ち株数を上回る売却はできません");
        }
        return false;
      }

      if (Math.abs(stocks[i]) > 5) {
        if (player.name === "あなた") {
          setMessage("売買株数は5株以下にしてください");
        } else {
          console.log("売買株数は5株以下にしてください");
        }
        return false;
      }
    }

    return true;
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
      updatedLogs[updatedLogs.length - 1].logs.push({
        playerName: updatedPlayer.name,
        logs: [],
      });

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

        updatedPlayer.money += (isBuy ? -1 : 1) * dealingPrice;
        updatedPlayer.stocks[i] += isBuy ? stock : -stock;

        updatedStockPrices[i] += isBuy ? -stock : stock;

        updatedLogs[updatedLogs.length - 1].logs[
          updatedLogs[updatedLogs.length - 1].logs.length - 1
        ].logs.push({
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
        sx={{
          margin: "16px",
          backgroundColor: "white",
          color: "blue",
          "&:hover": {
            backgroundColor: "blue",
            color: "white",
          },
        }}
        onClick={handleClick}
        className="button"
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : "決定"}
      </Button>
    </div>
  );
};

export default StockSelector;
