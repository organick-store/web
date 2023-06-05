import $api from '../http';

export default class AuthService {
  static async login(email, password) {
    return $api.post('/signin', { email, password });
  }

  static async registration(name, email, password) {
    return $api.post('/signup', {name, email, password });
  }

  static async refresh(token) {
    return $api.put(`/refresh/${token}`);
  }
  // static async logout() {
  //   return $api.post('/logout');
  // }

}

