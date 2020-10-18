<template>
  <div
    :class="`${type === 'error' ? 'bg-red-200 border-red-300 text-red-900' : 'bg-green-200 border-green-300 text-green-900'} p-3 border rounded font-semibold`"
  >
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    type: {
      validator (value) {
        return ['success', 'error'].indexOf(value) !== -1
      },
      default: 'success'
    },
    message: { type: String, required: true }
  }
}
</script>