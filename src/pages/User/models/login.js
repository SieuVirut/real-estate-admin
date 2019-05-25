import { routerRedux } from 'dva/router';
import { fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { login } from '@/services/account'
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import request from '@/utils/request';
import { setUserToken, removeUserToken } from '@/utils/authority'
import 'isomorphic-fetch'
var _ = require('lodash')

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      let response = yield call(login, payload)
      if (response && response.token !== undefined) {
        response.status = 201
        response.currentAuthority = response && response.data && response.data.level || 'guest' 
      }
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });

      // set user token
      let token = `Bearer ${response.token}`
      yield setUserToken(token)

      // Login successfully
      if (response.status === 201) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout(_, { put }) {
      yield removeUserToken()
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      reloadAuthorized();
      yield put(routerRedux.replace('/user/login'));
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
        userInfo: payload
      };
    },
  },
};
