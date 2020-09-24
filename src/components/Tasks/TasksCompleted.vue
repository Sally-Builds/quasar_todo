<template>
    <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
        >
        <div :class="{'q-mt-lg' : !settings.showTasksInOneList}">
            <List-header 
                :bgColor="`bg-green-4`"
                v-if="!settings.showTasksInOneList"
            >Completed</List-header>
            <q-list bordered separator>
                <tasks
                    v-for="(task, key) in tasksCompleted" 
                    :key="key" 
                    :task="task"
                    :id="key"
                >
                </tasks>
            </q-list>
        </div>
    </transition>
</template>

<script>
import tasks from 'components/Tasks/Task.vue'
import {mapGetters} from 'vuex'
export default {
    props: ['tasksCompleted'],
    components: {
        tasks,
        'ListHeader': require('components/Shared/ListHeader').default
    },
    computed: {
    ...mapGetters('settings', ['settings'])
}

}
</script>

<style>

</style>