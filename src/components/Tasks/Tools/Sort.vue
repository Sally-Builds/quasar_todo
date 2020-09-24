<template>
  <q-select 
    filled
    v-model="sortBy"
    :options="options"
    emit-value
    map-options
    label="Sort by"
    stack-label
    dense
    class="col-3 q-ml-sm"
  />
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data() {
        return {
            // sortBy: null,
            options: [
                {label:'Name', value: 'name'},
                {label:'Date', value: 'dueDate'},
            ],
        }
    },
    computed: {
        ...mapState('tasks', ['sort']),
        sortBy: {
            get() {
               return this.sort
            },
            set(value) {
                this.setSort(value)
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['setSort'])
    }
}
</script>

<style scoped>
    
</style>