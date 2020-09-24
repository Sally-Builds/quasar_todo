<template>
  <q-page>
    <q-list bordered padding class="q-mb-md">
      <q-item-label header>Settings</q-item-label>
      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show 24 hour time format</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-toggle color="blue" v-model="changeTimeFormat" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section>
          <q-item-label>Show tasks in one list</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-toggle color="blue" v-model="showTasksInOneList" />
        </q-item-section>
      </q-item>
    </q-list>


    <q-list bordered padding>
      <q-item-label header>More</q-item-label>

      <q-item tag="label" v-ripple  to="/settings/help">
        <q-item-section>
          <q-item-label>Help</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-icon name="chevron_right" size="sm" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple @click="visitOurWebsite">
        <q-item-section>
          <q-item-label>Visit Our website</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-icon name="chevron_right" size="sm" />
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple @click="emailUs">
        <q-item-section>
          <q-item-label>Email us</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-icon name="chevron_right" size="sm" />
        </q-item-section>
      </q-item>

    </q-list>
  </q-page>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {openURL} from 'quasar'
export default {
  data() {
    return {
      // changeTimeFormat: false
    }
  },
  computed: {
    ...mapGetters('settings', ['settings']),
    changeTimeFormat: {
        get() {
          return this.settings.changeTimeFormat
        },
        set(value) {
          this.setChangeTimeFormat(value)
        }
    },
    showTasksInOneList: {
        get() {
          return this.settings.showTasksInOneList
        },
        set(value) {
          this.setShowTasksInOneList(value)
        }
    },
  },
  methods: {
    ...mapActions('settings', ['setChangeTimeFormat', 'setShowTasksInOneList']),
    visitOurWebsite() {
      openURL('http://www.google.com')
    },
    emailUs() {
      window.location.href = 'mailto:joshua@gmail.com?subject=hello world'
    }
  }
}
</script>
