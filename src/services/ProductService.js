import $api from '../http';

export default class ProductService {
  static getAll() {
    return $api.get('/products');
    // return Promise.resolve({
    //   data: {
    //     products: [
    //       {
    //         id: 1,
    //         name: 'Product 1',
    //         price: 100,
    //         description: 'Description 1',
    //         type: 'Type 1',
    //       },
    //       {
    //         id: 2,
    //         name: 'Product 2',
    //         price: 200,
    //         description: 'Description 2',
    //         type: 'Type 2',
    //       },
    //       {
    //         id: 3,
    //         name: 'Product 3',
    //         price: 300,
    //         description: 'Description 3',
    //         type: 'Type 3',
    //       },
    //     ],
    //   },
    // });
  }
}
