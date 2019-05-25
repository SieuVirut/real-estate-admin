import { routerRedux } from 'dva/router';
import { notification } from 'antd'
import {
  fetchListAgency,
  fetchAgencyDetailById,
  fetchListRequestToJoinAgency,
  createAgency,
  updateAgencyById,
  deleteAgency
} from '@/services/agency'

export default {
  namespace: 'agency',
  state: {
    listAgency: [],
    listRequestAgency: [],
    agencyDetail: []
  },

  effects: {
    *fetchListAgency(_, { call, put }) {
      try {
        const result = yield call(fetchListAgency)
        yield put({
          type: 'saveListAgency',
          payload: result && result.data
        })
      } catch (error) {
        notification.error({
          message: `Fetch List Agency Fail`,
          description: error,
        })
      }
    },
    *fetchAgencyDetailById(payload, { call, put }) {
      try {
        // let id = payload && payload.query && payload.query
        const { query } = payload
        const result = yield call(fetchAgencyDetailById, query)
        yield put({
          type: 'saveAgencyDetailById',
          payload: result && result.data
        })
      } catch (error) {
        notification.error({
          message: `Fetch Agency Detail Fail`,
          description: error,
        })
      }
    },
    *fetchListRequestAgency(_, { call, put }) {
      try {
        const result = yield call(fetchListRequestToJoinAgency)
        yield put({
          type: 'saveListRequestAgency',
          payload: result && result.data
        })
      } catch (error) {
        notification.error({
          message: `Fetch List Agency Fail`,
          description: error,
        })
      }
    },
    *createAgency({ payload }, { call, put }) {
      try {
        let result = yield call(createAgency, payload)
        result && result.data && notification.success({
          message: `Tạo mới công ty thành công `,
          description: result.data && result.data.name,
        })
        result && result.errors && notification.error({
          message: `Có lỗi khi tạo công ty `,
          description: result.errors && result.errors.message,
        })
      } catch (error) {
        notification.error({
          message: `Create New Agency Fail`,
          description: error,
        })
      }
    },
    *updateAgencyInfoById({ payload }, { call, put }) {
      try {
        let result = yield call(updateAgencyById, payload)
        result && result.data && notification.success({
          message: `Cập nhập thông tin công ty thành công `,
          description: result.data && result.data.name,
        })
        result && result.errors && notification.error({
          message: `Có lỗi khi cập nhập thông tin công ty `,
          description: result.errors && result.errors.message,
        })
      } catch (error) {
        notification.error({
          message: `Update Agency Info Fail`,
          description: error,
        })
      }
    },
    *deleteAgency({ payload }, { call, put }) {
      try {
        let result = yield call(deleteAgency, payload)
        yield put({
          type: 'agency/fetchListAgency'
        })
        notification.success({
          message: `Xóa công ty thành công `,
          description: payload.name,
        })
      } catch (err) {
        notification.error({
          message: `Delete Agency Fail`,
          description: err,
        })
      }
    }

  },

  reducers: {
    saveListAgency(state, { payload }) {
      return {
        ...state,
        ...{
          listAgency: payload
        },
      }
    },
    saveListRequestAgency(state, { payload }) {
      return {
        ...state,
        ...{
          listRequestAgency: payload
        },
      }
    },
    saveAgencyDetailById(state, { payload }) {
      return {
        ...state,
        ...{
          agencyDetail: payload
        }
      }
    }
  },
};
