<template>
  <div class="w-64 relative inline-block">
    <label class="mb-2 block font-bold uppercase tracking-widest text-xs">{{ label }}</label>
    <input
      type="text"
      class="bg-gray-200 p-3 rounded outline-none w-full shadow-sm"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    label: {
      type: String
    }
  }
}
</script>
