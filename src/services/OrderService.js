import $api from '../http';

export default class OrderService {
  static async order(orderData) {
    return $api.post('/order', orderData);
  }
}