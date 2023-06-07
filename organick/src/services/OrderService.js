import $api from '../http';

export class OrderService {
  static async order(orderData) {
    return $api.post('/order', orderData);
  }
}