<template>
  <q-page>

    <div class="q-pa-md absolute full-width full-height column">

      <template v-if="tasksDownloaded">
        <div class="row q-mb-lg">
          <Search />
          <Sort />
        </div>
        <p v-if="search && !Object.keys(tasksToDo).length && !Object.keys(tasksCompleted).length">No search Results</p>
        <q-scroll-area class="q-scroll-area-tasks">
          <NoTasks 
          v-if="!Object.keys(tasksToDo).length && !search && !settings.showTasksInOneList" />
          <TasksToDo :tasksToDo="tasksToDo"  v-if="Object.keys(tasksToDo).length" />
          <TasksCompleted :tasksCompleted="tasksCompleted"  v-if="Object.keys(tasksCompleted).length" />
        </q-scroll-area>
        
        <div class="absolute-bottom text-right q-mb-lg q-mr-md no-pointer-events">
          <q-btn 
          round
          color="primary"
          size="24px"
          icon="add"
          class="all-pointer-events"
          @click="showAddTask = true"
          />
        </div>
      </template>

      <template v-else>
        <span class="absolute-center">
        <q-spinner color="primary" size="3em" />
        </span>
      </template>

    </div>




    <q-dialog v-model="showAddTask">
      <add-task @close="showAddTask = false"></add-task>
    </q-dialog>
  </q-page>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import TasksToDo from 'components/Tasks/TasksToDo.vue'
import NoTasks from 'components/Tasks/NoTasks.vue'
import Search from 'components/Tasks/Tools/Search.vue'
import Sort from 'components/Tasks/Tools/Sort.vue'
import TasksCompleted from 'components/Tasks/TasksCompleted.vue'
import addTask from 'components/Tasks/Modals/AddTask.vue'
export default {
  data() {
    return {
      showAddTask: false
    }
  },
  computed: {
    ...mapGetters('tasks', ['tasksToDo', 'tasksCompleted']),
    ...mapGetters('settings', ['settings']),
    ...mapState('tasks', ['search', 'tasksDownloaded'])
  },
  mounted() {
    this.$root.$on('show-add-task', () => {
      this.showAddTask = true
    })
  },
  components: {
    addTask,
    TasksToDo,
    TasksCompleted,
    NoTasks,
    Search,
    Sort,
  }
}
</script>

<style>
  .q-scroll-area-tasks {
    display: flex;
    flex-grow: 1;
  }
</style>
