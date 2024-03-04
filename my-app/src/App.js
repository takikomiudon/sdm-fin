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
    const アベノミクス = [0, 2, 1, 0, 3];//スプシ4行目
    const 金融緩和 = [0, 1, 0, 1, 2];//スプシ9行目
    const リーマンショック = [0, -3, 0, -1, -2];//スプシ14行目
    const 長期金利の上昇 = [0, 3, 0, 0, 0];//スプシ19行目
    const D社赤字を発表 = [0, 0, 0, -3, 0];//スプシ24行目

    const eventArray = [アベノミクス, 金融緩和, リーマンショック, 長期金利の上昇, D社赤字を発表];
    const [eventNum, setEventNum] = useState(0);//eventArrayの何番目を表示するか

    //ここまで(丸山)

  // プレイヤーの行動ログを記録
  // めんどいので任せます

  // スタート画面が表示されないバグ
  if (isStarted) {
    return (
      <div className="App">
        <Start props={{ isStarted, setIsStarted }} />
      </div>
    )
  }

  if (isFinished) {
    return (
      <div className="App">
        <Result props={{ isFinished, year, player1, player2, player3, player4 }} />
      </div>
    )
  }
  
  return (
    <div className="App">
      <GameYearAndPeriod props={{ year, period, isFinished }}/>
      <PlayerInfoList props={{ player1, player2, player3, player4 }}/>
      <Log />
      <div className='mainDisplay'>
        <StockPriceChart props={ stockPrices }/>
        <Event />
      </div>
      <StockSelector props={{ player1, player2, player3, player4, stockPrices, setPlayer1, setPlayer2, setPlayer3, setPlayer4, setStockPrices, year, setYear, period, setPeriod, isFinished, setIsFinished }} />
    </div>
  );
}

export default App;
