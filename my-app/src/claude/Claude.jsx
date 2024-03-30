import React, { useState } from "react";

const Claude = () => {
  const [message, setMessage] = useState("");
  const generateText = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_ANTHROPIC_API_URL, {
        method: "POST",
        body: JSON.stringify({
          system: "ドラゴンボールの悟空になりきって返答してください",
          content: `現在、A社の株価は${Math.floor(Math.random() * 1000)}円です。`
        }),
      });
      const text = await response.json();
      setMessage(text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={generateText}>Generate Text {message && <p>{message}</p>}</button>
    </div>
  );
};

export default Claude;
