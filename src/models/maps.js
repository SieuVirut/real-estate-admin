// import { uploadFile } from '@/services/files'


export default {
  namespace: 'maps',

  state: {},

  effects: {
    // *setLocation({ payload }, { call, put }) {
    //   console.log('setLocations', payload)
    //   // let response = yield call(uploadFile, payload)
    //   yield put({
    //     type: 'saveLocation',
    //     payload: payload,
    //   })
    // },
  },

  reducers: {
    saveLocation(state, payload) {
      return {
        ...state,
        ...payload.data
      }
    },
    clearLocation(state) {
      return {}
    }
  },
}
