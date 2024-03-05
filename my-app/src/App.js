import React, { useState } from 'react';
import './App.css';
import GameYearAndPeriod from './gameYearAndPeriod/GameYearAndPeriod';
import PlayerInfoList from './playerInfo/PlayerInfoList';
import StockPriceChart from './stockPriceChart/StockPriceChart';
import StockSelector from './stockSelector/StockSelector';
import Event from './event/Event';
import Result from './result/Result';
import Log from './log/Log';
import Start from './start/Start';

function App() {
  // 4プレイヤーの所持株式、所持金をstateを用いて管理する
  const initialPlayerState = {
    stocks: [0, 0, 0, 0, 0],
    money: 1000
  }
  const [player1, setPlayer1] = useState(initialPlayerState);
  const [player2, setPlayer2] = useState(initialPlayerState);
  const [player3, setPlayer3] = useState(initialPlayerState);
  const [player4, setPlayer4] = useState(initialPlayerState);

  // 5種類の株式の買値のindexをstateを用いて管理する
  const initialStockPriceState = [5, 5, 5, 5, 5];
  const [stockPrices, setStockPrices] = useState(initialStockPriceState);

  const [year, setYear] = useState(1);
  const [period, setPeriod] = useState(1);

  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // イベントをここに定義する(一旦5つ、株価が変動するやつ　内容はスプレッドシート参照) 丸山くん

  // プレイヤーの行動ログを記録
  // めんどいので任せます

  // スタート画面が表示されないバグ
  if (isStarted) {
    return (
      <div className="App">
        <Start isStarted={isStarted} setIsStarted={setIsStarted} />
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="App">
        <Result isFinished={isFinished} year={year} player1={player1} player2={player2} player3={player3} player4={player4} />
      </div>
    )
  }
  
  return (
    <div className="App">
      <GameYearAndPeriod year={year} period={period} isFinished={isFinished}/>
      <PlayerInfoList player1={player1} player2={player2} player3={player3} player4={player4} />
      <Log />
      <div className='mainDisplay'>
        <StockPriceChart stockPrices={stockPrices} />
        <Event />
      </div>
      <StockSelector player1={player1} player2={player2} player3={player3} player4={player4} stockPrices={stockPrices} setPlayer1={setPlayer1} setPlayer2={setPlayer2} setPlayer3={setPlayer3} setPlayer4={setPlayer4} setStockPrices={setStockPrices} year={year} setYear={setYear} period={period} setPeriod={setPeriod} isFinished={isFinished} setIsFinished={setIsFinished} />
    </div>
  );
}

export default App;
