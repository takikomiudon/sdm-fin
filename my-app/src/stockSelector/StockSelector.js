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

    return (
        <div className='StockSelector'>
            <div className='StockSelectButtons'>
                <StockSelectButton stock={stock0} setStock={setStock0} stockId={0}/>
                <StockSelectButton stock={stock1} setStock={setStock1} stockId={1}/>
                <StockSelectButton stock={stock2} setStock={setStock2} stockId={2}/>
                <StockSelectButton stock={stock3} setStock={setStock3} stockId={3}/>
                <StockSelectButton stock={stock4} setStock={setStock4} stockId={4}/>
            </div>
            <Button variant="contained" sx = {{margin: '16px'}}
            onClick={() => {
                // 株を売買する処理を記述する

                if (props.props.year === 4 && props.props.period === 4) {
                    props.props.setIsFinished(true);
                } else if (props.props.period === 4) {
                    props.props.setYear(props.props.year + 1);
                    props.props.setPeriod(1);
                } else {
                    props.props.setPeriod(props.props.period + 1);
                }
            }
            } className='button'>決定</Button>
        </div>
    );
}

export default StockSelector;