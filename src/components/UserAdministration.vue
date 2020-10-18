<template>
  <div class="mx-auto flex min-h-screen items-center justify-center">
    <!-- Card -->
    <div class="border border-gray-200 rounded-sm p-10 bg-white w-full max-w-xl">
      <alert class="mb-5" :type="alert.type" :message="alert.message" v-if="alert.show" />

      <form @submit.prevent="onLogin" class="mb-2" v-if="isRegistered">
        <input-group v-model="name" type="submit" title="Sign In" />
      </form>

      <form @submit.prevent="onRegister" class="mb-2" v-else>
        <!-- Input Group -->
        <input-group v-model="name" type="submit" title="Register" />
      </form>

      <a
        href="javascript:void(0)"
        class="text-blue-500 text-sm"
        @click="isRegistered = !isRegistered"
      >{{ isRegistered ? 'Create a new account' : 'Already have an account? Sign in' }}</a>
    </div>
  </div>
</template>

<script>
import Alert from './utilities/Alert'
import InputGroup from './utilities/InputGroup'

import alert from '../mixins/alert.js'

export default {
  name: 'UserAdministration',
  mixins: [alert],
  components: {
    InputGroup,
    Alert
  },
  data () {
    return {
      name: '',
      isRegistered: false
    }
  },
  methods: {
    async onRegister () {
      this.$store.dispatch('notification/showNotification', {
        type: '',
        message: 'Communicating to server...'
      })

      const res = await this.$store.dispatch('user/register', { name: this.name || '' })

      if (typeof res.success !== 'undefined') {
        this.alert = { show: true, type: res.error ? 'error' : 'success' }
        this.alert.message = res.error ? res.message : 'Your account has been successfully created'
        this.hideAlert()
      }
    },
    async onLogin () {
      this.$store.dispatch('notification/showNotification', {
        type: '',
        message: 'Communicating to server...'
      })

      const res = await this.$store.dispatch('user/login', { name: this.name || '' })

      if (typeof res.success !== 'undefined') {
        this.alert = { show: true, type: res.error ? 'error' : 'success' }
        this.alert.message = res.error ? res.message : 'You are successfully logged in'
        this.hideAlert()
      }
    }
  }
}
</script>