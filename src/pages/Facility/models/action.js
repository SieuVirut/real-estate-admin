import { notification } from 'antd'
import { fetchListFacilities, createFacility, deleteFacility } from '@/services/facility'
// var _ = require('lodash')

export default {
  namespace: 'facility',

  state: {
    listFacilities: {},
  },

  effects: {
    *fetchListFacilities(_, { call, put }) {
      try {
        let result = yield call(fetchListFacilities)
        yield put({
          type: 'fetch',
          payload: result
        })
      } catch (error) {
        notification.error({
          message: `Fetch List Facilities Fail`,
          description: error,
        });
      }

    },
    *createFacility({ payload }, { call, put }) {
      try {
        let result = yield call(createFacility, payload)
        yield put({
          type: 'facility/fetchListFacilities'
        })

      } catch (error) {
        notification.error({
          message: `Create Facility Fail`,
          description: error,
        });
      }
    },
    *deleteFacility({ payload }, { call, put }) {
      try {
        let result = yield call(deleteFacility, payload)
        yield put({
          type: 'facility/fetchListFacilities'
        })
        result && result.errors && notification.error({
          message: `Delete Facility Fail`,
          description: result.errors && result.errors.message,
        })
        result && result.data && notification.success({
          message: `Xóa tiện ích thành công `,
          description: payload.name,
        })
      } catch (err) {
        notification.error({
          message: `Delete Facility Fail`,
          description: err,
        })
      }
    }
  },

  reducers: {
    fetch(state, { payload }) {
      return {
        ...state,
        ...{
          listFacilities: payload
        },
      }
    },
  },
};
