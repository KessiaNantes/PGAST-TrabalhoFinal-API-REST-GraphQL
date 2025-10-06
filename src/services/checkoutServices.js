import { produtos } from "../models/produtos.js";

export class CheckoutService {

  static listarProdutos() {
    return produtos;
  }
  
}