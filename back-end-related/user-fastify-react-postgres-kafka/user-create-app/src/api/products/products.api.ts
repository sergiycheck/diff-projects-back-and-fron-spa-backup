import axios from "axios";
import * as z from "zod";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030/",
});

export const createProductSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
});

export type CreateProduct = z.infer<typeof createProductSchema>;

export const productSchema = createProductSchema.extend({
  id: z.string().uuid(),
});

export type Product = z.infer<typeof productSchema>;

export const createProduct = (body: CreateProduct) => axiosInstance.post("/products/create", body);

export const getProducts = () => axiosInstance.get<Product[]>("/products");

export const deleteProduct = (id: string) => axiosInstance.delete(`/products/${id}`);
