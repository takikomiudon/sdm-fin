const Log = (props) => {
  return (
    <div className="log">
      <h2>Log</h2>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Period</th>
            <th>Player</th>
            <th>Stock Type</th>
            <th>Buy or Sell</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {props.actionLogs.map((log, index) => {
            if (log.length === 0) {
              return null;
            }
            return (
              <tr key={index}>
                <td>{log[0]}</td>
                <td>{log[1]}</td>
                <td>{log[2]}</td>
                <td>{log[3]}</td>
                <td>{log[4] ? "Buy" : "Sell"}</td>
                <td>{log[5]}</td>
                <td>{log[6]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
