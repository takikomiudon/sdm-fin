import React, { useState } from 'react';
import { Button } from '@mui/material';
import './StockSelector.css';
import StockSelectButton from './StockSelectButton';

const StockSelector = (props) => {
    // 5種類の株式について、売買する個数をボタンを用いて入力する
    // 買う場合は正の数、売る場合は負の数を入力する
    const [stock0, setStock0] = useState(0);
    const [stock1, setStock1] = useState(0);
    const [stock2, setStock2] = useState(0);
    const [stock3, setStock3] = useState(0);
    const [stock4, setStock4] = useState(0);

    const handleClick = () => {
        validateTrade()
        trade()
        initialTrade()
        event()

        if (props.props.year === 4 && props.props.period === 4) {
            props.props.setIsFinished(true);
        } else if (props.props.period === 4) {
            props.props.setYear(props.props.year + 1);
            props.props.setPeriod(1);
        } else {
            props.props.setPeriod(props.props.period + 1);
        }
    }

    const validateTrade = () => {
        // 売買数が不正である場合処理を中断 吉岡くん
        const sum=0;
        sum = stock0*setStock0+ stock1*setStock1 + stock2*setStock2 + stock3 * setStock3 + stock4*setStock4
        if(props.props.player.money < sum){
            setStock0(0);
            setStock1(0);
            setStock2(0);
            setStock3(0);
            setStock4(0);
        }
    }

    const initialTrade = () => {
        setStock0(0);
        setStock1(0);
        setStock2(0);
        setStock3(0);
        setStock4(0);
    }

    const trade = () => {
        // 売買プロセス(所持金、持ち株、株価の更新)を記述　前田くん
    }

    const event = () => {
        // イベントの内容に応じて株価などを変化させる 丸山くん
    }

    return (
        <div className='StockSelector'>
            <div className='StockSelectButtons'>
                <StockSelectButton stock={stock0} setStock={setStock0} stockId={0}/>
                <StockSelectButton stock={stock1} setStock={setStock1} stockId={1}/>
                <StockSelectButton stock={stock2} setStock={setStock2} stockId={2}/>
                <StockSelectButton stock={stock3} setStock={setStock3} stockId={3}/>
                <StockSelectButton stock={stock4} setStock={setStock4} stockId={4}/>
            </div>
            {/* ここに売買数が不正である際のメッセージを書く isValidというbooleanの変数を定義して、不正の時falseにすることで表示非表示を管理する 吉岡くん */}
            <Button variant="contained" sx = {{margin: '16px'}}
            onClick={handleClick} 
            className='button'>決定</Button>
        </div>
    );
}

export default StockSelector;