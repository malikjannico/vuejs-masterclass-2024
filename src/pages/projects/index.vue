<template>
  <DataTable v-if="projects" :columns="columns" :data="projects" />
</template>

<script setup lang="ts">
import { columns } from '@/utils/tableColumns/projectColumns'
import { projectsQuery, type Projects } from '@/utils/supaQueries'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery
  if (error) console.log(error)
  projects.value = data
}

await getProjects()
</script>

<style></style>
