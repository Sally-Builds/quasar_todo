<template>
    <q-item 
        v-ripple 
        @click="updateTask({id, updates: {completed: !task.completed}})"
        clickable
        v-touch-hold:1000.mouse="showEditTaskModal"
        :class="task.completed == true ? 'bg-green-1' : 'bg-indigo-1'">
        <q-item-section side top>
          <q-checkbox class="no-pointer-events" :value="task.completed" />
        </q-item-section>

        <q-item-section>
          <q-item-label
            :class="{'text-strikethrough' : task.completed}"
            v-html="$options.filters.searchHighlight(task.name, search)"  
          >
            <!-- {{ task.name | searchHighlight(search) }} -->
          </q-item-label>
        </q-item-section>

         <q-item-section side>
           <div class="row">
             <div class="column justify-center" v-if="task.dueDate">
              <q-icon name="events" size="18px" class="q-mr-xs"/>
             </div>
            <div class="column">
              <q-item-label caption class="row justify-end">
                {{task.dueDate | niceDate}}
              </q-item-label>
              <q-item-label caption class="row justify-end">
                <small>
                  {{taskDueTime}}
                </small>
              </q-item-label>
           </div>
          </div>
        </q-item-section>

        <q-item-section side>
          <div class="row">
              <!-- edit button  -->
              <q-btn dense 
                flat 
                round 
                color="primary" 
                icon="edit"
                @click.stop="showEditTaskModal"
               />
            <!-- delete button -->
              <q-btn dense 
              flat 
              round 
              color="red" 
              icon="delete"
              @click.stop="promptDelete(id)" />
          </div>
        </q-item-section>
        
        <q-dialog v-model="showEditTask">
          <edit-task :task="task" :id="id" @close="showEditTask = false"></edit-task>
        </q-dialog>

      </q-item>
</template>

<script>
import  {mapActions, mapState, mapGetters} from 'vuex'
import {date} from 'quasar'
export default {
    props: ['task', 'id'],
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask').default
    },
    data() {
      return {
          showEditTask: false
      }
    },
    computed: {
      ...mapState('tasks', ['search']),
      ...mapGetters('settings', ['settings']),
      taskDueTime() {
        if(!this.settings.changeTimeFormat){
          return date.formatDate(`${this.task.dueDate} ${this.task.dueTime}`, 'h:mmA')
        }
        return this.task.dueTime
      }
    },
    methods: {
      //mapActions('module name of store', [array of actions u re importing])
      ...mapActions('tasks', ['updateTask', 'deleteTask']),
      promptDelete(id) {
          this.$q.dialog({
          title: 'Confirm',
          message: 'Would you like to turn on the wifi?',
          cancel: {
            color: 'negative'
          },
          ok: {
            push: true,
            color: 'primary'
          },
          persistent: true
        }).onOk(() => {
          this.deleteTask(id)
        })
      },
      showEditTaskModal() {
        this.showEditTask = true
      }
    },
    filters: {
      niceDate(value) {
        return date.formatDate(value, 'MMM D')
      },
      searchHighlight(value, search) {
        if(search){
          let searchRegex = new RegExp(search, ('ig'))
          return value.replace(searchRegex, (match) => {
            return `<span class='bg-yellow-6'> ${search} </span>`
          })
        }
        return value
      }
    }
}
</script>