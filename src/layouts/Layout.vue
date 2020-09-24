<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="absolute-center">
          Awesome Todo
        </q-toolbar-title>
        <q-btn 
          v-if="!loggedIn"
          flat
          to="/auth"
          icon-right="account_circle"
          class="absolute-right"
          label="Login"
        />
        <q-btn 
          v-if="loggedIn"
          flat
          icon-right="account_circle"
          class="absolute-right"
          label="Logout"
          @click="logoutUser"
        />
      </q-toolbar>
    </q-header>

    <q-footer>
      <q-tabs>
        <q-route-tab 
        v-for="(link, i) in essentialLinks" 
        :key="i" :to="link.link" 
        exact 
        :icon="link.icon" 
        :label="link.title" />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :breakpoint="767"
      bordered
      content-class="bg-primary"
      :width="200"
    >
      <q-list dark>
        <q-item-label
          header
          class="text-grey-8"
        >
          Navigation
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="text-grey-4"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
  {
    title: 'Todo',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  },
  computed:{
    ...mapState('auth', ['loggedIn'])
  },
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>

<style lang="scss">
  @media screen and (min-width: 768px){
    .q-footer {
      display: none;
    }
  }
  .q-drawer {
    .q-router-link--exact-active {
    color: white !important;
    }
  }
  /* .q-drawer .q-router-link--exact-active {
    color: white !important;
  } */
</style>
