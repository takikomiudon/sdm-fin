import React, { useState } from "react";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
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
import { useSnackbar } from "notistack";

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
  const [open, setOpen] = useState(false);
  let updatedLogs = [...logs];
  let updatedStockPrices = [...stockPrices];
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbar = (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
    });
  };

  const handleSubmit = async () => {
    setOpen(false);
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
      dividend(player1, setPlayer1);
      dividend(player2, setPlayer2);
      dividend(player3, setPlayer3);
      dividend(player4, setPlayer4);
    } else {
      setPeriod(period + 1);
    }

    setEventNum(eventNum + 1);

    setIsLoading(false);
  };

  const validateTrade = (
    stocks: number[],
    player: Player,
    updatedStockPrices: number[]
  ) => {
    let sum = 0;
    let total_stocks = 0;

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < Math.abs(stocks[i]); j++) {
        if (stocks[i] > 0) {
          sum += priceArray[updatedStockPrices[i] - j];
        } else if (stocks[i] < 0) {
          sum -= priceArray[updatedStockPrices[i] + 1 + j];
        }
      }
      total_stocks += Math.abs(stocks[i]);
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

    if (total_stocks > 5) {
      if (player.name === "あなた") {
        setMessage("売買株数は合計5株以下にしてください");
      } else {
        console.log("売買株数は合計5株以下にしてください");
      }
      return false;
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
        dealingPrice += priceArray[stockPrices[i] + (isBuy ? 0 : 1)] * stock;

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

      for (let i = 0; i < 5; i++) {
        if (stocks[i] !== 0) {
          handleSnackbar(
            `${player.name}が${stockName[i]}を${stocks[i]}${stocks[i] > 0 ? "株買い" : "株売り"}ました`
          );
        }
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

  const dividend = (
    player: Player,
    setPlayer: React.Dispatch<React.SetStateAction<Player>>
  ) => {
    let multiple = [];
    if (year === 1) {
      multiple = [20, 0, 10, 30, 0];
    } else if (year === 2) {
      multiple = [20, 20, 20, 30, 0];
    } else if (year === 3) {
      multiple = [20, 0, 10, 20, 0];
    } else {
      multiple = [0, 0, 0, 0, 0];
    }
    for (let i = 0; i < 5; i++) {
      player.money += player.stocks[i] * multiple[i];
    }
    setPlayer(player);
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
        onClick={handleOpen}
        className="button"
      >
        {isLoading ? <CircularProgress color="inherit" size={24} /> : "決定"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          以下の内容で取引を行いますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  {playerStocks.map((stock, index) => (
                    <TableRow key={index}>
                      <TableCell>{stockName[index]}</TableCell>
                      <TableCell>
                        {stock > 0
                          ? `${stock}株買い`
                          : stock < 0
                          ? `${-stock}株売り`
                          : "なし"}
                      </TableCell>
                      <TableCell>
                        {stock > 0
                          ? priceArray[stockPrices[index] - 1]
                          : stock < 0
                          ? priceArray[stockPrices[index]]
                          : "0"}
                        万円
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={handleSubmit} autoFocus>
            決定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StockSelector;
