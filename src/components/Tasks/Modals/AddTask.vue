<template>
    <q-card>
        <modal-header>Add Task</modal-header>

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
import {mapActions} from 'vuex'
import ModalHeader from 'components/Tasks/Modals/Shared/ModalHeader'
export default {
    components: {
        ModalHeader,
    },
    data() {
        return {
            taskToSubmit: {
                name: '',
                dueDate: '',
                dueTime: '',
                completed: false,
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['addTask']),
        submitForm() {
            if(!this.taskToSubmit.dueDate) this.taskToSubmit.dueTime = ''
            this.addTask(this.taskToSubmit)
            this.$emit('close')
        }
    }
}
</script>