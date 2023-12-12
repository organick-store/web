import $api from '../http';

export default class ProductService {
  static fetchProducts() {
    return $api.get('/products');
  }
}
