<template>
    <q-card>
        <modal-header>Edit Task</modal-header>

        <q-card-section class="q-pt-none">
            <q-form @submit.prevent="submitForm">
                <!-- input name -->
                <q-input 
                    rounded 
                    autofocus
                    clearable
                    outlined 
                    v-model="taskToSubmit.name" 
                    label="Task name"  
                    class="q-mb-sm"
                    :rules="[val => !!val || 'Field is required']"
                    v-select-all
                />
                <!-- input date -->
                    <q-input 
                        label="Due Date"
                        rounded 
                        outlined 
                        clearable
                        v-model="taskToSubmit.dueDate" 
                        class="q-mb-sm">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                                        <q-date v-model="taskToSubmit.dueDate">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>
                                        </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                    <!-- input time -->
                    <q-input 
                        v-show="taskToSubmit.dueDate"
                        label="Due Time"
                        rounded 
                        clearable
                        outlined 
                        v-model="taskToSubmit.dueTime" 
                        class="q-mb-sm">
                        <template v-slot:append>
                            <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="taskToSubmit.dueTime">
                                        <div class="row items-center justify-end">
                                            <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input> 
                    <q-card-actions align="right">
                        <q-btn label="Save" type="submit" color="primary" />
                    </q-card-actions>
            </q-form>
        </q-card-section>
      </q-card>
</template>

<script>
import {selectAll} from 'src/directives/directives-select-all.js'
import {mapActions} from 'vuex'
import ModalHeader from 'components/Tasks/Modals/Shared/ModalHeader'
// import mixin from 'src/mixins/path' 
export default {
    props: ['task', 'id'],
    components: {
        ModalHeader,
    },
    data() {
        return {
            taskToSubmit: {}
        }
    },
    methods: {
        ...mapActions('tasks', ['updateTask']),
        submitForm() {
            if(!this.taskToSubmit.dueDate) this.taskToSubmit.dueTime = ''
            this.updateTask({ id: this.id, updates: this.taskToSubmit})
            this.$emit('close')
        }
    },
    mounted() {
        this.taskToSubmit = Object.assign({}, this.task)
    },
    directives: {
        selectAll,
    },
    // mixins: []
}
</script>