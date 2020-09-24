<template>
  <q-page padding>
      <q-card class="auth-tabs">
          <q-tabs
            v-model="tab"
            dense
            narrow-indicator
            align="justify"
            class="text-grey"
            indicator-color="primary"
            active-color="primary"
          >
              <q-tab name="login" label="Login" />
              <q-tab name="register" label="Register" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="login">
                  <LoginRegister :tab="tab" />
              </q-tab-panel>
              <q-tab-panel name="register">
                    <LoginRegister :tab="tab" />
              </q-tab-panel>
          </q-tab-panels>
      </q-card>
  </q-page>
</template>

<script>
export default {
    components: {
        'LoginRegister': require('components/Auth/LoginRegister').default
    },
    data() {
        return {
            tab: 'login'
        }
    }
}
</script>

<style>
.auth-tabs {
        max-width: 500px;
        margin: 0 auto;
    }
</style>