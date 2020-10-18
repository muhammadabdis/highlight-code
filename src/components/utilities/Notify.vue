<template>
  <div
    :class="`${getStyle} p-3 rounded font-semibold fixed w-64 top-0 right-0 shadow-lg m-5`"
    v-if="$store.state.notification.show"
  >
    {{ $store.state.notification.message }}
  </div>
</template>

<script>
export default {
  name: 'Notify',
  computed: {
    getStyle () {
      let style = ''

      switch (this.$store.state.notification.type) {
        case 'success':
          style = 'bg-green-200 text-green-900'
          break

        case 'error':
          style = 'bg-red-200 text-red-90'
          break

        default:
          style = 'bg-white text-blue-700'
          break
      }

      return style
    }
  }
}
</script>