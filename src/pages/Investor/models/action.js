import { routerRedux } from 'dva/router';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';
import request from '@/utils/request';
import { getUserToken } from '@/utils/authority'
import {
  fetchListInvestor,
  createInvestor,
  deleteInvestor,
  fetchInvestorInfoById,
  updateInvestorInfoById
} from '@/services/investor'
import { notification, message } from 'antd'

export default {
  namespace: 'investor',

  state: {
    listInvestor: {},
    investorDetail: {}
  },

  effects: {
    *fetchListInvestor(_, { call, put }) {
      try {
        let result = yield call(fetchListInvestor)
        yield put({
          type: 'fetch',
          payload: result
        })
      } catch (error) {
        notification.error({
          message: `Fetch List Investor Fail`,
          description: error,
        });
      }
    },
    *fetchInvestorInfoById(payload, { call, put }) {
      try {
        const { query } = payload
        let result = yield call(fetchInvestorInfoById, query)
        result && result.data && (
          yield put({
            type: 'saveInvestorInfoById',
            payload: result
          })
        )
        result && result.errors && (
          notification.error({
            message: `Fetch Investor Detail Fail`,
            description: result.errors.message,
          })
        )
      } catch (error) {
        notification.error({
          message: `Fetch List Investor Fail`,
          description: error,
        });
      }
    },
    *createInvestor({ payload }, { call, put }) {
      try {
        let result = yield call(createInvestor, payload)
        result && result.data && notification.success({
          message: `Tạo thành công chủ đầu tư`,
          description: result.data.name,
        })
        result && result.errors && notification.error({
          message: `Create New Investor Fail`,
          description: result.errors.message
        })
      } catch (error) {
        notification.error({
          message: `Create New Investor Fail`,
          description: error,
        });
      }
    },
    *updateInvestorInfoById({ payload }, { call, put }) {
      try {
        let result = yield call(updateInvestorInfoById, payload)
        result && result.data && notification.success({
          message: `Cập nhập thành công chủ đầu tư`,
          description: result.data.name,
        })
        result && result.errors && notification.error({
          message: `Update Investor Fail`,
          description: result.errors.message
        })
      } catch (error) {
        notification.error({
          message: `Create New Investor Fail`,
          description: error,
        });
      }
    },
    *deleteInvestor({ payload }, { call, put }) {
      try {
        let result = yield call(deleteInvestor, payload)
        yield put({
          type: 'investor/fetchListInvestor',
        })
        notification.success({
          message: ` Đã xóa chủ đầu tư`,
          description: payload && payload.name
        })
      } catch (error) {
        notification.error({
          message: `Có lỗi xảy ra!`,
          description: error,
        })
      }
    },
  },

  reducers: {
    fetch(state, { payload }) {
      return {
        ...state,
        ...{
          listInvestor: payload
        },
      }
    },
    saveInvestorInfoById(state, { payload }) {
      return {
        ...state,
        ...{
          investorDetail: payload
        }
      }
    }
  }
}
