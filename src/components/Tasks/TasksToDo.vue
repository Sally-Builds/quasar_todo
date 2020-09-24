<template>
        <transition
        appear
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut absolute-top"
        >
            <div>
                <List-header
                :bgColor="`bg-indigo-4`"
                v-if="!settings.showTasksInOneList"
                >Todoooooooooos II</List-header>
                <q-list bordered separator>
                    <tasks
                        v-for="(task, key) in tasksToDo" 
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
    props: ['tasksToDo'],
    components: {
        tasks,
        'ListHeader': require('components/Shared/ListHeader').default
    },
    computed: {
        ...mapGetters('settings', ['settings'])
    }
}
</script>