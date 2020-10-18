<template>
  <!-- Input Group -->
  <div class="flex shadow-sm">
    <input
      type="text"
      name="name"
      class="flex-grow bg-gray-200 p-3 rounded-l outline-none"
      placeholder="Enter your name here"
      autocomplete="off"
      @input="$emit('input', $event.target.value)"
    >
    <button :type="type === 'submit' ? 'submit' : 'button'" class="flex-grow-0 py-3 px-5 bg-pink-500 text-gray-100 rounded-r font-semibold">{{ title }}</button>
  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  props: {
    title: {
      type: String,
      required: true
    },
    type: {
      validator (value) {
        return ['submit', 'button'].indexOf(value) !== -1
      },
      default: 'button',
      required: true
    }
  }
}
</script>