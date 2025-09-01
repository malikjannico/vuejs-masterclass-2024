<template>
  <div
    :class="['cursor-pointer', 'text-2xl', { 'pointer-events-none': readonly }]"
    @click="toggleValue"
  >
    <Transition name="scale" mode="out-in">
      <iconify-icon
        v-if="value === 'completed'"
        icon="lucide:circle-check"
        class="text-green-500"
      ></iconify-icon>
      <iconify-icon v-else icon="lucide:circle-dot" class="text-gray-500"></iconify-icon>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { Database } from '../../../database/types'
type Status = Database['public']['Enums']['current_status']
const value = defineModel<Status>()
const emit = defineEmits(['commit'])
const { readonly = false } = defineProps<{
  readonly?: boolean
}>()
const toggleValue = () => {
  if (readonly) return
  value.value = value.value === 'completed' ? 'in-progress' : 'completed'
  emit('commit')
}
</script>
