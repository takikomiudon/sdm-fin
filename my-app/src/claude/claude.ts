import { CustomEvent } from "../types/event";
import { Player } from "../types/player";
import priceArray from "../data/priceArray";

const claude = async (
  stockPrices: number[],
  player: Player,
  event: CustomEvent,
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
            cash: player.money,
            stock_prices: {
              A: priceArray[stockPrices[0]],
              B: priceArray[stockPrices[1]],
              C: priceArray[stockPrices[2]],
              D: priceArray[stockPrices[3]],
              E: priceArray[stockPrices[4]],
            },
            stock_counts: {
              A: player.stocks[0],
              B: player.stocks[1],
              C: player.stocks[2],
              D: player.stocks[3],
              E: player.stocks[4],
            },
            event:
              "A社の新製品が好調で、株価が2段階上昇する見込み。一方、B社は業績不振で株価が1段階下落する可能性がある。",
            year: year,
            period: period,
            id: "2",
          }),
        });
        const text = await response.json();
        console.log(text);
        const extractNumbers = (str: string): number[] | null => {
          const regex = /(-?\d+,\s?){4}-?\d+/;
          const match = str.match(regex);
          if (match) {
            return match[0].split(",").map((num) => parseInt(num, 10));
          } else {
            return null;
          }
        };
        const textArray = extractNumbers(text);

        if (
          textArray &&
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

    return [0, 0, 0, 0, 0];
  };

  return await generateText();
};

export default claude;
