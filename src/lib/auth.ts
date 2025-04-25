/* eslint-disable import/no-anonymous-default-export */
import { toast } from 'react-toastify';
// import history from 'src/routes/history';
import { getProfile, loginByRefreshToken, logout } from '@/services/account';
import { DEFAULT_LOGIN_PATH } from '@/constants/routes';

class AuthHandler {
  _accessToken: string | null = '';
  _refreshToken: string | null = '';
  _user: any = undefined;
  _name: string | null = '';
  constructor() {
    if (typeof window === 'undefined') return;
    this._accessToken = localStorage.getItem('access_token');
    this._refreshToken = localStorage.getItem('refresh_token');
    this._name = localStorage.getItem('name');
    try {
      this._user = JSON.parse(localStorage.getItem('user') as string);
      this._name = localStorage.getItem('name');
    } catch (e) {}
  }

  login(responseValue: any) {
    const { access_token, refresh_token, name } = responseValue;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
    if (name) {
      localStorage.setItem('name', name);
    }
    this._accessToken = access_token;
    this._refreshToken = refresh_token;
    this._name = name;
  }

  get user() {
    return this._user;
  }
  get name() {
    return this._name;
  }
  get accessToken() {
    return this._accessToken;
  }
  get refreshToken() {
    return this._refreshToken;
  }
  get isLoggedIn() {
    return !!this._accessToken;
  }

  async loadUser() {
    const { status, data } = await getProfile();
    if (status === 200 || data?.succeed) {
      let user = data?.value;
      user.LastUpdate = Date.now();
      localStorage.setItem('user', JSON.stringify(user));
      this._user = user;
    }
  }

  async refresh() {
    const { status, data } = await loginByRefreshToken({
      payload: { refreshToken: this._refreshToken as string },
    });
    if (status !== 200 || !data?.succeed) {
      toast.error('common:messages.toast.tokenExpired');
      this.logout();
      throw 'failed';
    } else {
      this.login(data?.value);
    }
  }

  async logout(router?: any) {
    const refreshTokenFromStorage = localStorage.getItem('refresh_token');

    if (!refreshTokenFromStorage) {
      router?.push(DEFAULT_LOGIN_PATH);
      return;
    }

    const { status } = await logout({
      payload: { refreshToken: refreshTokenFromStorage },
    });

    if (status === 200) {
      this._accessToken = '';
      this._refreshToken = '';
      this._user = undefined;
      this._name = '';
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      localStorage.removeItem('name');

      router?.push(DEFAULT_LOGIN_PATH);
    }
  }
}
export default new AuthHandler();
