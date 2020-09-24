import quasarConf from 'app/quasar.conf'
import Vue from 'vue'
import { uid, Notify } from 'quasar'
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import { showErrorMessage } from "src/functions/function-show-error-message";

const state = {
    tasks: {
        // 'id1': {
        //   name: 'Clean the house',
        //   completed: false,
        //   dueDate: '2020/11/23',
        //   dueTime: '16:45',
        // },
        // 'id2': {
        //   name: 'visit Nana',
        //   completed: true,
        //   dueDate: '2020/11/24',
        //   dueTime: '16:45',
        // },
        // 'id3': {
        //   name: 'Train for the base ball game',
        //   completed: false,
        //   dueDate: '2020/11/25',
        //   dueTime: '16:45',
        // },
        // 'id4': {
        //   name: 'movie night with the lads',
        //   completed: true,
        //   dueDate: '2020/11/26',
        //   dueTime: '16:45',
        // }
    },
    search: '',
    sort: 'name',
    tasksDownloaded: false,
}

const getters = {
  tasksSorted(state) {
    let tasksSorted = {}
    let keysOrdered = Object.keys(state.tasks)

    keysOrdered.sort((a,b) => {
      let taskAName = state.tasks[a][state.sort].toLowerCase()
      let taskBName = state.tasks[b][state.sort].toLowerCase()
      if(taskAName > taskBName) return 1
      else if(taskAName < taskBName) return -1
      else return 0
    })

    keysOrdered.forEach((e) => {
      tasksSorted[e] = state.tasks[e]
    })
    return tasksSorted
  },
  tasksFiltered(state, getters) {
    let tasksSorted = getters.tasksSorted
    let tasksFiltered = {}
    if(state.search) {
      Object.keys(tasksSorted).forEach(e => {
        let task = tasksSorted[e]
        let taskNameToLowerCase= task.name.toLowerCase()
        let searchToLowerCase = state.search.toLowerCase()
        if(taskNameToLowerCase.includes(searchToLowerCase)){
          tasksFiltered[e] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
    tasksToDo(state, getters) {
      let tasksFiltered = getters.tasksFiltered
      let tasks = {}
      Object.keys(tasksFiltered).forEach((e) => {
        let task = tasksFiltered[e]
        if(!task.completed) {
          tasks[e] = task
        } 
      })
        return tasks
    },
    tasksCompleted(state, getters) {
      let tasksFiltered = getters.tasksFiltered
      let tasks = {}
      Object.keys(tasksFiltered).forEach((e) => {
        let task = tasksFiltered[e]
        if(task.completed) {
          tasks[e] = task
        } 
      })
        return tasks
    },
}

const mutations =  {
  updateTask(state, payload) {
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch(state, payload) {
    state.search = payload
  },
  setSort(state, payload) {
    state.sort = payload
  },  
  setTasksDownloaded(state, payload) {
    state.tasksDownloaded = payload
  },
  clearTasks(state) {
    state.tasks = {}
  }
}

const actions = {
  updateTask({dispatch}, payload) {
    dispatch('fbUpdateTask', payload)

  },
  deleteTask({dispatch}, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({dispatch}, task) {
    let taskId = uid()
    dispatch('fbAddTask', {id:taskId, task})
  },
  setSearch({commit}, payload) {
    commit('setSearch', payload)
  },
  setSort({commit}, payload) {
    commit('setSort', payload)
  },
  fbReadData({commit}) {
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref(`tasks/${userId}`)

    //initial check for data
    userTasks.once('value', snapshot => {
      commit('setTasksDownloaded', true)
    }, err => {
      if(err) {
        showErrorMessage(err.message)
        this.$router.replace('/auth')
      }
    })

    //child added
    userTasks.on('child_added', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        task,
      }
      commit('addTask', payload)
    })

    //child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task,
      }
      commit('updateTask', payload)
    })

    //child removed
    userTasks.on('child_removed', snapshot => {
      commit('deleteTask', snapshot.key)
    })

  },
  fbAddTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`)
    taskRef.set(payload.task, err => {
      if(err) {
        showErrorMessage(err.message)
      }else {
        Notify.create('Task Added successfully')
      }
    })
  },
  fbUpdateTask({}, payload) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${userId}/${payload.id}`)
    taskRef.update(payload.updates, err => {
      if(err) {
        showErrorMessage(err.message)
      }else {
        let keys = Object.keys(payload.updates)
        if (!(keys.includes('completed') && keys.length == 1)){
          Notify.create('Task updated successfully')
        }
      }
    })
  },
  fbDeleteTask({}, id) {
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref(`tasks/${userId}/${id}`)
    taskRef.remove(err => {
      if(err) {
        showErrorMessage(err.message)
      }else {
        Notify.create('Task Deleted')
      }
    })
  },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}