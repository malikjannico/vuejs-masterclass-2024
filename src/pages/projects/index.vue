<template>
  <DataTable v-if="projects" :columns="columnsWithCollaborators" :data="projects" />
</template>

<script setup lang="ts">
import { useCollaborators } from '@/composables/collaborators'
import { columns } from '@/utils/tableColumns/projectColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

await getProjects()

const { getGroupedCollaborators, groupedCollaborators } = useCollaborators()
getGroupedCollaborators(projects.value ?? [])
const columnsWithCollaborators = columns(groupedCollaborators)
</script>

<style></style>
