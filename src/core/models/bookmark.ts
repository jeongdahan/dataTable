export interface IBookmark {
  id: string;
  name: string;
  symbol: string;
  current_price: string;
  price_change_percentage_24h: string;
  total_volume: string;
  currency: { icon: string; value: string; text: string } | undefined;
}
