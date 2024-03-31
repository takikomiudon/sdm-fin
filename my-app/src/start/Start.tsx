import React from "react";

const Start = ({
  setIsStarted,
}: {
  setIsStarted: (isStarted: boolean) => void;
}) => {
  const handleClick = () => {
    setIsStarted(true);
  };

  return (
    <div>
      <div>ここにゲームの説明を書く</div>
      <button onClick={handleClick}>スタート</button>
    </div>
  );
};

export default Start;
