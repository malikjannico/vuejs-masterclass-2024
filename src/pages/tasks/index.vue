<template>
  <DataTable v-if="tasks" :columns="columnsWithCollabs" :data="tasks" />
</template>

<script setup lang="ts">
import { useTasksStore } from '@/stores/loaders/tasks'
import { columns } from '@/utils/tableColumns/taskColumns'

usePageStore().pageData.title = 'My Tasks'

const tasksLoader = useTasksStore()
const { tasks } = storeToRefs(tasksLoader)
const { getTasks } = tasksLoader

await getTasks()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()

getGroupedCollaborators(tasks.value ?? [])

const columnsWithCollabs = columns(groupedCollaborators)
</script>

<style></style>
