<template>
      <q-input 
        outlined 
        rounded 
        v-model="searchField" 
        label="Search"
        class="col"
        v-select-all
        @keyup.esc="searchField = ''"
        >
          <template v-slot:append>
              <q-icon 
              v-if="searchField !== ''" 
              name="close" 
              @click="searchField = ''"  
              class="cursor-pointer"/>
              <q-icon name="search" />
          </template>
      </q-input>
</template>

<script>
import {selectAll} from 'src/directives/directives-select-all.js'
import {mapState, mapActions} from 'vuex'
export default {
    computed: {
        ...mapState('tasks', ['search']),
        searchField: {
            get() {
            return this.search
            },
            set(value) {
                this.setSearch(value)
            }
        }
    },
    methods: {
        ...mapActions('tasks', ['setSearch'])
    },
    directives: {
        selectAll,
    }
}
</script>

<style>

</style>