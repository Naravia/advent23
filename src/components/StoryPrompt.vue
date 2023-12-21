<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>

<template>
  <div class="bg-gray-200 rounded-md p-2">
    <h1 class="text-2xl text-gray-800 pb-2">{{ title }}</h1>
    <hr class="border-gray-400" />
    <div class="text-gray-700 flex flex-col flex-1 p-2 space-y-2">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>

</style>