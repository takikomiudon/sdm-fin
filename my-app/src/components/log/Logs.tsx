import React from "react";
import { Log } from "../../types/log";

const Logs = ({ logs }: { logs: Log[] }) => {
  return (
    <div className="m-10">
      <h2>取引履歴</h2>
      <table>
        <thead>
          <tr>
            <th className="w-10">年</th>
            <th className="w-10">期</th>
            <th>プレーヤー</th>
            <th className="w-40">銘柄</th>
            <th className="w-10">売買</th>
            <th>合計金額</th>
            <th className="w-10">個数</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            if (logs.length === 0) {
              return null;
            }
            return (
              <tr key={index}>
                <td>{log.year}</td>
                <td>{log.period}</td>
                <td>{log.playerName}</td>
                <td>{log.stockType}</td>
                <td>{log.isBuy ? "買" : "売"}</td>
                <td>{log.price}万円</td>
                <td>{log.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
