<template>
  <div class="w-64 relative inline-block">
    <label class="mb-2 block font-bold uppercase tracking-widest text-xs">{{ label }}</label>
    <div class="relative">
      <input
        type="text"
        class="bg-gray-200 p-3 rounded outline-none w-full shadow-sm"
        :placeholder="placeholder"
        :value="value"
        @input="onInput"
        @blur="onBlur"
        @click="onClick"
      >

      <div
        class="bg-white shadow-lg rounded-b mt-2 absolute w-full overflow-auto"
        style="max-height: 400px"
        v-if="show"
        @mouseenter="preventClose = true"
        @mouseleave="preventClose = false"
      >
        <slot name="header"></slot>
        
        <div v-if="showableOptions.length" class="py-2">
          <div
            v-for="opt in showableOptions"
            :class="`px-4 py-2 cursor-pointer ${checkValue(opt) ? 'bg-pink-100 text-pink-500' : 'hover:bg-gray-200'}`"
            :key="opt"
            @click="onOptionClick($event, opt)"
          >
            {{ opt }}
          </div>
        </div>
        <div v-else class="p-4 text-gray-500">No records found</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectInput',
  props: {
    label: { type: String },
    value: {
      type: String
    },
    placeholder: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      showableOptions: [],
      show: false,
      preventClose: false
    }
  },
  methods: {
    async onInput (e) {
      this.$emit('input', e.target.value)
      await this.filterOptions(e.target.value)
      this.showOptions()
    },
    async onBlur (e) {
      if (!this.preventClose && !this.options.includes(e.target.value)) {
        e.target.value = await this.showableOptions.length && this.options.length !== this.showableOptions.length ? this.showableOptions[0] : ''
        this.$emit('input', e.target.value)
      }

      if (!this.preventClose) this.hideOptions()
    },
    onClick () {
      this.showOptions()
      this.resetOptions()
    },
    async onOptionClick (e, val) {
      this.hideOptions()
      this.$emit('input', val)
    },
    checkValue (val) {
      return val && this.value && this.value.toString() === val.toString();
    },
    filterOptions (val) {
      this.showableOptions = this.options.filter(v => v.match(new RegExp(`^${val}`, 'i')))
    },
    resetOptions () {
      this.showableOptions = this.options
    },
    showOptions () {
      this.show = true
    },
    hideOptions () {
      this.show = false
    }
  }
}
</script>
