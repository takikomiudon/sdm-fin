import React, { useState } from "react";
import { Button } from "@mui/material";
import StockSelectButton from "./StockSelectButton";

const StockSelector = (props) => {
  const [playerStocks, setPlayerStocks] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (!validateTrade(playerStocks, props.player1.money)) {
      setMessage("所持金が足りません");
      return;
    }
    trade(playerStocks, props.player1, props.setPlayer1);
    initialTrade();
    event();

    if (props.year === 4 && props.period === 4) {
      props.setIsFinished(true);
    } else if (props.period === 4) {
      props.setYear(props.year + 1);
      props.setPeriod(1);
      // TODO 配当金の実装
    } else {
      props.setPeriod(props.period + 1);
    }

    props.setEventNum(props.eventNum + 1);
  };

  const validateTrade = (stocks, money) => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += props.stockPrices[i] * stocks[i];
    }

    return sum <= money;
  };

  const initialTrade = () => {
    setPlayerStocks([0, 0, 0, 0, 0]);
  };

  const priceArray = [
    460, 390, 330, 280, 240, 200, 180, 160, 140, 120, 100, 90, 80, 70, 60, 50,
    40, 30, 20, 10, 0,
  ];

  const trade = (stocks, player, setPlayer) => {
    let updatedPlayer = JSON.parse(JSON.stringify(player));
    let updatedActionLogs = [...props.actionLogs];

    for (let i = 0; i < 5; i++) {
      let stock = stocks[i];

      if (stock === 0) {
        continue;
      }

      const isBuy = stock > 0;
      stock = isBuy ? stock : -stock;

      const dealingPrice = priceArray[props.stockPrices[i] + !isBuy];

      updatedPlayer.money -= stock * dealingPrice;
      updatedPlayer.stocks[i] += isBuy ? stock : -stock;

      props.setStockPrices((currentPrices) => {
        const updatedPrices = [...currentPrices];
        updatedPrices[i] += isBuy ? -stock : stock;
        return updatedPrices;
      });

      updatedActionLogs.push({
        year: props.year,
        period: props.period,
        playerName: player.name,
        stockType: `stock${i}`,
        isBuy: isBuy,
        price: dealingPrice,
        quantity: stock,
      });
    }

    setPlayer(updatedPlayer);
    props.setActionLogs(updatedActionLogs);
  };

  const event = () => {
    props.setStockPrices((currentPrices) => {
      const newPrices = [...currentPrices];
      for (let i = 0; i < 5; i++) {
        if (newPrices[i] - props.eventArray[props.eventNum][i] < 0) {
          newPrices[i] = 0;
        } else if (newPrices[i] - props.eventArray[props.eventNum][i] > 19) {
          newPrices[i] = 19;
        } else {
          newPrices[i] -= props.eventArray[props.eventNum][i];
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
