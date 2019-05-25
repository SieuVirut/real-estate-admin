import { routerRedux } from 'dva/router'
import {
  fetchListProject,
  fetchProjectInfoById,
  createProject,
  deleteProject,
  updateProjectInfoById
} from '@/services/project'
import { notification, message } from 'antd'

export default {
  namespace: 'project',
  state: {
  },

  effects: {
    *fetchListProject(_, { call, put }) {
      try {
        let result = yield call(fetchListProject)
        yield put({
          type: 'saveListProject',
          payload: result
        })
        result && result.errors && notification.error({
          message: `Fetch List Project Fail`,
          description: result.errors.message,
        })
      } catch (error) {
        notification.error({
          message: `Fetch List Project Fail`,
          description: error,
        })
      }
    },
    *fetchProjectInfoById(payload, { call, put }) {
      try {
        let { id } = payload
        let result = yield call(fetchProjectInfoById, id)
        result && result.data && (
          yield put({
            type: 'saveProjectInfoById',
            payload: result
          })
        )
        result && result.errors && (
          notification.error({
            message: `Fetch Project Detail Fail`,
            description: result.errors.message,
          })
        )
      } catch (error) {
        notification.error({
          message: `Fetch Project Info Fail`,
          description: error,
        })
      }
    },
    *createProject({ payload }, { call, put }) {
      try {
        let result = yield call(createProject, payload)
        result && result.data && notification.success({
          message: `Tạo thành công dự án`,
          description: result.data.name,
        })
        result && result.errors && notification.error({
          message: `Create New Project Fail`,
          description: result.errors.message
        })
      } catch (error) {
        notification.error({
          message: `Create New Project Fail`,
          description: error,
        })
      }
    },
    *updateProjectInfoById({ payload }, { call, put }) {
      try {
        let result = yield call(updateProjectInfoById, payload)
        result && result.data && notification.success({
          message: `Cập nhập thành công dự án`,
          description: result.data.name,
        })
        result && result.errors && notification.error({
          message: `Update Project Fail`,
          description: result.errors.message
        })
      } catch (error) {
        notification.error({
          message: `Create New project Fail`,
          description: error,
        })
      }
    },
    *deleteProject({ payload }, { call, put }) {
      try {
        let result = yield call(deleteProject, payload)
        yield put({
          type: 'project/fetchListProject',
        })
        notification.success({
          message: ` Đã xóa dự án ra khỏi danh sách`,
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
    saveListProject(state, { payload }) {
      return {
        ...state,
        ...{
          listProject: payload
        },
      }
    },
    saveProjectInfoById(state, { payload }) {
      return {
        ...state,
        ...{
          projectDetail: payload
        }
      }
    }
  }
}
