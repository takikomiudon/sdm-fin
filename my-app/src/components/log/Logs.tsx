import React from "react";
import { Log } from "../../types/log";

const Logs = ({ logs }: { logs: Log[] }) => {
  return (
    <div className="m-10">
      <h2>取引履歴</h2>
      <table className="w-96">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => {
            if (logs.length === 0) {
              return null;
            }
            return (
              <tr key={index}>
                <td>{log.year}年目</td>
                <td>第{log.period}期</td>
                <td>{log.playerName}</td>
                <td>{log.stockType}</td>
                <td>{log.isBuy ? "買い" : "売り"}</td>
                <td>{log.price}万円</td>
                <td>{log.quantity}株</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
