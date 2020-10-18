<template>
  <div class="flex">
    <button class="py-1 px-4 bg-teal-500 text-teal-100 rounded font-semibold box-border text-sm" @click="$emit('save')">Save</button>
    <button class="py-1 px-4 bg-white border border-teal-500 text-teal-500 rounded font-semibold box-border text-sm ml-2" @click="$emit('download')">Download</button>
    <button class="py-1 px-4 bg-white border border-teal-500 text-teal-500 rounded font-semibold box-border text-sm ml-2" @click="$emit('reset')">Clear All</button>
  </div>
</template>

<script>
export default {
  name: 'ActionsSection'  
}
</script>
