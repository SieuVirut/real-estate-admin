import { uploadFile } from '@/services/files'


export default {
  namespace: 'files',

  state: {},

  effects: {
    *upload({ payload }, { call, put }) {
      let response = yield call(uploadFile, payload)
      yield put({
        type: 'saveUrl',
        payload: response && response.data,
      })
    },
  },

  reducers: {
    save(state, payload) {
      return {
        ...state,
        ...payload
      }
    },
    saveUrl(state, payload) {
      return {
        ...state,
        [payload.folder]: payload && payload.response
      }
    },
    saveListUrl(state, payload) {
      return {
        ...state,
        [payload.folder]: payload && payload.fileList
      }
    },
    setInitialValue(state, payload) {
      return {
        ...state,
        ...{
          initialValue: {
            [payload.folder]: payload && payload.images
          }
        }
      }
    },
    cleanUrl(state, payload) {
      return {
        ...state,
        [payload.folder]: []
      }
    }
  },
}
