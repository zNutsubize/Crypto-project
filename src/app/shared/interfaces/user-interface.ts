export interface User {
  email: string;
  password: string;
  age: number;
  phone: number;
  gender: 'male' | 'female';
  watchlist: any[];
  id: number;
}
