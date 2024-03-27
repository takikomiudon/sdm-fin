const Log = (props) => {
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
          {props.actionLogs.map((log, index) => {
            if (log.length === 0) {
              return null;
            }
            return (
              <tr key={index}>
                <td>{log[0]}年目</td>
                <td>第{log[1]}期</td>
                <td>{log[2]}</td>
                <td>{log[3]}</td>
                <td>{log[4] ? "買い" : "売り"}</td>
                <td>{log[5]}万円</td>
                <td>{log[6]}株</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Log;
