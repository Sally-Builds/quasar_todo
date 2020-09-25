// import something here
import {LocalStorage} from 'quasar'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default ({router}) => {
  router.beforeEach((to, from, next) => {

    let loggedIn = LocalStorage.getItem('loggedIn')
    if(!loggedIn && to.path !== '/auth'){
      next('/auth')
    }else {
      next()
    }
  })
}
