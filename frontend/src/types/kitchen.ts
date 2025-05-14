export interface Batch {
  quantity: number;
  unit: string;
  expirationDate?: Date;
}

export interface Ingredient {
  exclude: boolean;
  batches: Batch[];
}

export interface Category {
  exclude: boolean;
  ingredients: {
    [key: string]: Ingredient;
  };
}

export interface KitchenStock {
  [key: string]: Category;
}

export interface User {
  name: string;
  email: string;
  kitchenStock: KitchenStock;
} 