import React, { useState } from "react";
import { Button } from "@mui/material";
import "./StockSelector.css";
import StockSelectButton from "./StockSelectButton";

const StockSelector = (props) => {
  const [stock0, setStock0] = useState(0);
  const [stock1, setStock1] = useState(0);
  const [stock2, setStock2] = useState(0);
  const [stock3, setStock3] = useState(0);
  const [stock4, setStock4] = useState(0);
  const [message, setMessage] = useState("");

  const handleClick = () => {
    if (!validateTrade()) {
      setMessage("所持金が足りません");
      return;
    }
    trade();
    initialTrade();
    event();

    if (props.props.year === 4 && props.props.period === 4) {
      props.props.setIsFinished(true);
    } else if (props.props.period === 4) {
      props.props.setYear(props.props.year + 1);
      props.props.setPeriod(1);
    } else {
      props.props.setPeriod(props.props.period + 1);
    }

    props.props.setEventNum(props.props.eventNum + 1);
  };

  const validateTrade = () => {
    let sum =
      props.props.stockPrices[0] * stock0 +
      props.props.stockPrices[1] * stock1 +
      props.props.stockPrices[2] * stock2 +
      props.props.stockPrices[3] * stock3 +
      props.props.stockPrices[4] * stock4;

    if (props.props.player1.money < sum) {
      return false;
    } else return true;
  };

  const initialTrade = () => {
    setStock0(0);
    setStock1(0);
    setStock2(0);
    setStock3(0);
    setStock4(0);
  };

  const priceArrey = [
    0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 240,
    280, 330, 390, 460,
  ];

  const trade = () => {
    for (let p = 1; p < 5; p++) {
      const player = props.props[`player${p}`];
      const setPlayer = props.props[`setPlayer${p}`];

      for (let i = 0; i < 5; i++) {
        let stock = 0;

        switch (i) {
          case 0:
            stock = stock0;
            break;
          case 1:
            stock = stock1;
            break;
          case 2:
            stock = stock2;
            break;
          case 3:
            stock = stock3;
            break;
          case 4:
            stock = stock4;
            break;
          default:
            break;
        }

        if (stock === 0) {
          continue;
        }

        const isBuy = stock > 0;
        stock = isBuy ? stock : -stock;

        const dealingPrice = priceArrey[props.props.stockPrices[i] - !isBuy];

        const updatedMoney = player.money + stock * dealingPrice;
        const updatedStocks = isBuy
          ? player.stocks[i] + stock
          : player.stocks[i] - stock;

        const updatedPrice = props.props.stockPrices[i] + (isBuy ? 1 : -1);

        setPlayer({
          stocks: [
            ...player.stocks.slice(0, i),
            updatedStocks,
            ...player.stocks.slice(i + 1),
          ],
          money: updatedMoney,
        });

        console.log(props.props.stockPrices);

        props.props.setStockPrices([
          ...props.props.stockPrices.slice(0, i),
          updatedPrice,
          ...props.props.stockPrices.slice(i + 1),
        ]);

        console.log(props.props.stockPrices);

        props.props.addActionLog(
          props.props.year,
          props.props.period,
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
      if (
        0 <=
        props.props.stockPrices[i] +
          props.props.eventArray[props.props.eventNum][i] <=
        20
      ) {
        newPrices[i] =
          props.props.stockPrices[i] +
          props.props.eventArray[props.props.eventNum][i];
      } else if (
        0 >
        props.props.stockPrices[i] +
          props.props.eventArray[props.props.eventNum][i]
      ) {
        newPrices[i] = 0;
      } else {
        newPrices[i] = 20;
      }
    }
    props.props.setStockPrices(newPrices);
  };

  return (
    <div className="StockSelector">
      <div className="StockSelectButtons">
        <StockSelectButton stock={stock0} setStock={setStock0} stockId={0} />
        <StockSelectButton stock={stock1} setStock={setStock1} stockId={1} />
        <StockSelectButton stock={stock2} setStock={setStock2} stockId={2} />
        <StockSelectButton stock={stock3} setStock={setStock3} stockId={3} />
        <StockSelectButton stock={stock4} setStock={setStock4} stockId={4} />
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
