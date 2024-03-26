const Start = ({ props }) => {
  return (
    <div>
      <div>ここにゲームの説明を書く</div>
      <button onClick={props.setIsStarted(true)}>スタート</button>
    </div>
  );
};

export default Start;
