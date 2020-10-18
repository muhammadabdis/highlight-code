<template>
  <div class="flex -ml-3">
    <div class="flex-1 ml-3 mb-3">
      <h1 class="mb-2 text-xl font-extrabold tracking-tight">Paste Your Source Here:</h1>
      <textarea
        class="border rounded bg-white border-gray-200 h-64 outline-none w-full" style="height: 360px; padding: 16px 24px 16px 24px"
        autofocus
        :value="code"
        @input="$emit('update:code', $event.target.value)"
      />
    </div>

    <div class="flex-1 ml-3 mb-3 overflow-auto">
      <h1 class="mb-2 text-xl font-extrabold tracking-tight">Output:</h1>
      <data-code v-if="highlightedCode" class="tampilan-kode--kustom" :lang="lang" :code="highlightedCode" />

      <div class="tampilan-kode--kustom" v-else>
        <div class="shiki">
          Your output will goes here
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CodeSection',
  props: {
    code: { type: String },
    lang: { type: String },
    highlightedCode: { type: String }
  }
}
</script>
