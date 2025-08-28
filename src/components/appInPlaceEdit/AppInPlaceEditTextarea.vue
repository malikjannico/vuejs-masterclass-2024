<template>
  <textarea
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    v-model="inputValue"
    @blur="emitCommit"
  ></textarea>
</template>

<script setup lang="ts">
const inputValue = defineModel<string | null>({ required: true })

const emit = defineEmits(['commit'])

const oldInputValue = ref(inputValue.value)
watch(inputValue, (newValue, oldValue) => {
  oldInputValue.value = oldValue
})

const emitCommit = () => {
  if (inputValue.value !== oldInputValue.value) {
    emit('commit')
    oldInputValue.value = inputValue.value
  }
}
</script>

<style scoped></style>
