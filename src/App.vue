<template>
  <div id="app" class="text-gray-800 bg-gray-100">
    <!-- Container -->
    <div class="max-w-screen-lg mx-auto min-h-screen">
      <user-administration v-if="!$store.getters['user/isAuthenticated']" />

      <main-section v-else />

      <notify />
    </div>
  </div>
</template>

<script>
import MainSection from './components/MainSection'
import UserAdministration from './components/UserAdministration'
import Notify from './components/utilities/Notify'

export default {
  name: 'App',
  components: {
    UserAdministration,
    MainSection,
    Notify
  }
}
</script>
