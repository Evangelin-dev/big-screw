// src/lib/products.ts
import { useEffect, useState } from "react";
import { api } from "./api";

export type ApiProduct = {
  id: number; name: string; slug: string; description: string;
  price: number; stock: number; min_order_qty: number; is_active: boolean;
};

export function useProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api("/products/").then(setProducts).catch(() => {}).finally(() => setLoading(false));
  }, []);
  return { products, loading };
}