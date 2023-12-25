import $api from '../http';

export default class ProductService {
  static getAll() {
    return $api.get('/products');
  }
}
