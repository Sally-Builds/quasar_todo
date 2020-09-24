import {firebaseAuth} from 'boot/firebase'
import {LocalStorage, Loading} from 'quasar'
import {showErrorMessage} from 'src/functions/function-show-error-message'

const state = {
    loggedIn: false
}

const getters = {
  
}

const mutations =  {
   setLoggedIn(state, payload) {
       state.loggedIn = payload 
   }
}

const actions = {
    registerUser({}, payload) {
        Loading.show()
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e.message)
            showErrorMessage(e.message)
        })
    },
    loginUser({}, payload) {
        Loading.show()
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
        .then(res => {
            console.log(res)
        }).catch(e => {
            showErrorMessage(e.message)
        })
    },
    logoutUser({}) {
        firebaseAuth.signOut()
    },
    handleAuthStateChange({commit, dispatch}) {
        firebaseAuth.onAuthStateChanged((user) => {
            Loading.hide()
            if(user) {
                commit('setLoggedIn', true)
                LocalStorage.set('loggedIn', true)
                this.$router.push('/').catch(e => {})
                dispatch('tasks/fbReadData', null, {root:true})
            }else {
                commit('tasks/clearTasks', null, {root: true})
                commit('tasks/setTasksDownloaded', false, {root: true})
                commit('setLoggedIn', false)
                LocalStorage.set('loggedIn', false)
                this.$router.replace('/auth').catch(e => {})
            }
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}