export interface StockLog {
  stockType: string;
  isBuy: boolean;
  price: number;
  quantity: number;
}

export interface PlayerLog {
  playerName: string;
  logs: StockLog[];
}

export interface Log {
  year: number;
  period: number;
  logs: PlayerLog[];
}
