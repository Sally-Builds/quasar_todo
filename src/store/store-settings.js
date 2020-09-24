import {LocalStorage} from 'quasar'

const state = {
    settings: {
      changeTimeFormat: false,
        showTasksInOneList: false
    }
}

const getters = {
  settings(state) {
      return state.settings
  }
}

const mutations =  {
    setChangeTimeFormat(state, payload) {
        state.settings.changeTimeFormat = payload
    },
    setShowTasksInOneList(state, payload) {
        state.settings.showTasksInOneList = payload
    },
    getSettings(state, payload) {
        Object.assign(state.settings, payload)
    }
}

const actions = {
    setChangeTimeFormat({commit, dispatch}, payload) {
        commit('setChangeTimeFormat', payload)
        dispatch('saveSettings')
    },
    setShowTasksInOneList({commit, dispatch}, payload) {
        commit('setShowTasksInOneList', payload)
        dispatch('saveSettings')
    },
    saveSettings({state}){
        LocalStorage.set('settings', state.settings)
    },
    getSettings({commit}) {
        let settings = LocalStorage.getItem('settings')
        if(settings) {
            commit('getSettings', settings)
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}