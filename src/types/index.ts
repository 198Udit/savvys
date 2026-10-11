export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  badge?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface StackCard {
  id: number;
  label: string;
  headline: string;
  sub: string;
  bg: string;
  text: string;
  accent: string;
  tag: string;
}
