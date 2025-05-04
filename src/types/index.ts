export type MenuItem = {
  id: number;
  name: string;
  price: number;
}

export type ConsumoItem = MenuItem & {
  quantity: number
}

export type Tip = {
  id: string;
  value: number;
  label: string
}