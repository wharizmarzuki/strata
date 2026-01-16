export type Bill = {
  _id: string;
  houseNumber: string;
  status?: 'paid' | 'unpaid' | 'partially-paid';
  tunggak?: string;
  amount?: number;
  balance?: number;
};
