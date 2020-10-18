<template>
  <div class="flex justify-center">
    <select-input
      label="Programming Languages"
      :value="lang"
      :options="languages"
      placeholder="Pick a language"
      @input="$emit('update:lang', $event)"
    />

    <select-input
      label="Two Slashes"
      :value="twoSlash"
      :options="twoSlashes"
      placeholder="Select two slash"
      class="ml-4"
      @input="$emit('update:twoSlash', $event)"
    >
      <template #header>
        <div class="pl-2 pr-4 py-3 bg-blue-200 text-blue-800 text-sm font-semibold flex">
          <div class="flex-grow-0 self-center">⚠</div>
          <div class="flex-grow pl-2">Available for with typescript and json language only</div>
        </div>
      </template>
    </select-input>

    <text-input
      label="File Name"
      placeholder="Enter file name"
      :value="fileName"
      class="ml-4"
      @input="$emit('update:fileName', $event)"
    />

    <text-input
      label="Highlight Line"
      placeholder="e.g. 1 3-5 3,5,7 3-5,9-13"
      :value="highlight"
      class="ml-4"
      @input="$emit('update:highlight', $event)"
    />
  </div>
</template>

<script>
import SelectInput from './utilities/SelectInput'
import TextInput from './utilities/TextInput'

export default {
  name: 'OptionSection',
  components: {
    SelectInput,
    TextInput
  },
  props: {
    fileName: { type: String },
    highlight: { type: String },
    lang: { type: String, default: '' },
    twoSlash: { type: String, default: '' },
    languages: { type: Array },
    twoSlashes: { type: Array }
  }
}
</script>
