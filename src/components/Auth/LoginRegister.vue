<template>
  <q-form @submit="submitForm">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />  
        </template>
          {{tab | titleCase}} to access and create your Todo's
      </q-banner>
    </div>
    <div class="row q-mb-md">
      <q-input 
        rounded 
        clearable
        :rules="[val => isValidEmailAddress(val) || 'Please enter a valid email address']"
        outlined 
        v-model="formData.email" 
        label="Email"  
        class="col"
        lazy-rules
      />
    </div>
    <div class="row q-mb-md">
      <q-input 
        rounded 
        clearable
        outlined 
        v-model="formData.password" 
        :rules="[val => val.length >= 8 || 'Please enter at least 8 characters']"
        label="Password"  
        class="col"
        lazy-rules
      />
    </div>

    <div class="row q-mb-md">
      <q-space />
      <q-btn type="submit" :label="tab" color="primary" />
    </div>
  </q-form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['tab'],
  data() {
    return {
      formData: {
        email: '',
        password: '',
      }
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser', 'loginUser']),
    submitForm() {
      if(this.tab === 'login') {
        this.loginUser(this.formData)
      }else {
        this.registerUser(this.formData)
      }
    },
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  },
  filters: {
    titleCase(val) {
      return val.charAt(0).toUpperCase() + val.slice(1)
    }
  }
}
</script>

<style>

</style>