import React, { useState } from "react";
import { Button } from "@mui/material";
import StockSelectButton from "./StockSelectButton";

const StockSelector = (props) => {
  const [stocks, setStocks] = useState([0, 0, 0, 0, 0]);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (!validateTrade()) {
      setMessage("所持金が足りません");
      return;
    }
    trade();
    initialTrade();
    event();

    if (props.year === 4 && props.period === 4) {
      props.setIsFinished(true);
    } else if (props.period === 4) {
      props.setYear(props.year + 1);
      props.setPeriod(1);
    } else {
      props.setPeriod(props.period + 1);
    }

    props.setEventNum(props.eventNum + 1);
  };

  const validateTrade = () => {
    let sum = 0;
    for (let i = 0; i < 5; i++) {
      sum += props.stockPrices[i] * stocks[i];
    }

    if (props.player1.money < sum) {
      return false;
    } else return true;
  };

  const initialTrade = () => {
    setStocks([0, 0, 0, 0, 0]);
  };

  const priceArray = [
    460, 390, 330, 280, 240, 200, 180, 160, 140, 120, 100, 90, 80, 70, 60, 50,
    40, 30, 20, 10, 0,
  ];

  const trade = () => {
    for (let p = 1; p < 5; p++) {
      const player = props[`player${p}`];
      const setPlayer = props[`setPlayer${p}`];

      for (let i = 0; i < 5; i++) {
        let stock = stocks[i];

        if (stock === 0) {
          continue;
        }

        const isBuy = stock > 0;
        stock = isBuy ? stock : -stock;

        const dealingPrice = priceArray[props.stockPrices[i] + !isBuy];

        const updatedMoney = player.money + stock * dealingPrice;
        const updatedStocks = isBuy
          ? player.stocks[i] + stock
          : player.stocks[i] - stock;

        const updatedPrice = props.stockPrices[i] + (isBuy ? -1 : 1);

        setPlayer({
          stocks: [
            ...player.stocks.slice(0, i),
            updatedStocks,
            ...player.stocks.slice(i + 1),
          ],
          money: updatedMoney,
        });

        props.setStockPrices([
          ...props.stockPrices.slice(0, i),
          updatedPrice,
          ...props.stockPrices.slice(i + 1),
        ]);

        props.addActionLog(
          props.year,
          props.period,
          `player1`,
          `stock${i}`,
          isBuy,
          dealingPrice,
          stock
        );
      }
    }
  };

  const event = () => {
    const newPrices = [0, 0, 0, 0, 0];
    for (let i = 0; i < 5; i++) {
      if (props.stockPrices[i] - props.eventArray[props.eventNum][i] < 0) {
        newPrices[i] = 0;
      } else if (
        props.stockPrices[i] - props.eventArray[props.eventNum][i] >
        19
      ) {
        newPrices[i] = 19;
      } else {
        newPrices[i] =
          props.stockPrices[i] - props.eventArray[props.eventNum][i];
      }
    }
    props.setStockPrices(newPrices);
  };

  return (
    <div className="StockSelector">
      <div className="flex flex-row justify-evenly">
        <StockSelectButton stocks={stocks} setStocks={setStocks} stockId={0} />
        <StockSelectButton stocks={stocks} setStocks={setStocks} stockId={1} />
        <StockSelectButton stocks={stocks} setStocks={setStocks} stockId={2} />
        <StockSelectButton stocks={stocks} setStocks={setStocks} stockId={3} />
        <StockSelectButton stocks={stocks} setStocks={setStocks} stockId={4} />
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
