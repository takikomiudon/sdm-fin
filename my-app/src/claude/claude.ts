import { Player } from "../types/player";

const claude = async (
  stockPrices: number[],
  player: Player,
  event: number[],
  year: number,
  period: number,
  retryCount = 0
): Promise<number[]> => {
  const generateText = async () => {
    try {
      const url = process.env.REACT_APP_ANTHROPIC_API_URL;
      if (!url) {
        console.error("API URL is not set");
      } else {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            system:
              "あなたには5つの企業の株式の売買により所持金を増やすゲームをしてもらいます。【ルール】- 各期にそれぞれのプレーヤーは株の売買を合わせて5株まで行うことができます。- 株を買うと株価が1段階上がり、株を売ると株価が一段階下がります。- 株の売値は買値の1段階下です。- プレーヤーには行動順があり、あなたは常に2番目に行動します。- 各期にはイベントがあり、全プレーヤーの取引が終了した後でイベントによる株価の変動が発生します。- 最終的な所持金が多いプレーヤーの勝利です。株は4年目第4期までに売らないと所持金として計上されないので注意してください。- 5つの企業には異なる特徴があり、A社は株価が安定しやすく、B社は景気に敏感、C社はバランス型、D社は高配当、E社は成長が見込まれるというものです。- 株を売ることにより持ち株数が負の値にならないようにすること【入力のフォーマット】A社の買値, B社の買値, C社の買値, D社の買値, E社の買値, 所持金, A社の持ち株数, B社の持ち株数, C社の持ち株数, D社の持ち株数, E社の持ち株数, イベントによりA社の株価が上下する段階, イベントによりB社の株価が上下する段階, イベントによりC社の株価が上下する段階, イベントによりD社の株価が上下する段階, イベントによりE社の株価が上下する段階, 年, 期【出力のフォーマット(買いを正の数、売りを負の数で表現します)】A社の売買個数, B社の売買個数, C社の売買個数, D社の売買個数, E社の売買個数 例: 1, 3, -1, 0, 0 (これ以外には何も出力しないこと)",
            content: `${stockPrices[0]}, ${stockPrices[1]}, ${stockPrices[2]}, ${stockPrices[3]}, ${stockPrices[4]}, ${player.money}, ${player.stocks[0]}, ${player.stocks[1]}, ${player.stocks[2]}, ${player.stocks[3]}, ${player.stocks[4]}, ${event[0]}, ${event[1]}, ${event[2]}, ${event[3]}, ${event[4]}, ${year}, ${period}`,
          }),
        });
        const text = await response.json();
        const textArray = text.split(",").map(Number);

        if (
          textArray.length === 5 &&
          textArray.reduce(
            (sum: number, num: number) => sum + Math.abs(num),
            0
          ) <= 5
        ) {
          return textArray;
        } else if (retryCount < 5) {
          return await claude(
            stockPrices,
            player,
            event,
            year,
            period,
            retryCount + 1
          );
        } else {
          return [0, 0, 0, 0, 0];
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return await generateText();
};

export default claude;
