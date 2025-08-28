import {
  projectsQuery,
  projectQuery,
  type Projects,
  type Project,
  updateProjectQuery,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)
  const project = ref<Project | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadProjects = useMemoize(async (key: string) => await projectsQuery)
  const loadProject = useMemoize(async (slug: string) => {
    return projectQuery(slug)
  })
  interface ValidateCacheParams {
    ref: typeof project | typeof projects
    query: typeof projectQuery | typeof projectsQuery
    key: string
    loader: typeof loadProject | typeof loadProjects
  }
  const validateCache = ({ ref, query, key, loader }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(key) : query
      finalQuery.then(({ data, error }) => {
        if (JSON.stringify(ref.value) === JSON.stringify(data)) {
          return
        } else {
          loader.delete(key)
          if (!error && data) ref.value = data
        }
      })
    }
  }
  const getProjects = async () => {
    projects.value = null
    const { data, error, status } = await loadProjects('projects')
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) projects.value = data
    validateCache({
      ref: projects,
      query: projectsQuery,
      key: 'projects',
      loader: loadProjects,
    })
  }
  const getProject = async (slug: string) => {
    project.value = null
    const { data, error, status } = await loadProject(slug)
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) project.value = data
    validateCache({
      ref: project,
      query: projectQuery,
      key: slug,
      loader: loadProject,
    })
  }
  const updateProject = async () => {
    if (!project.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, tasks, ...projectProps } = project.value
    await updateProjectQuery(projectProps, project.value.id)
  }
  return {
    projects,
    project,
    getProjects,
    getProject,
    updateProject,
  }
})
