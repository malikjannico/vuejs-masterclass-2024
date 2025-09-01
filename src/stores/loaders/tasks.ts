import {
  deleteTaskQuery,
  taskQuery,
  tasksWithProjectsQuery,
  updateTaskQuery,
  type Task,
  type TasksWithProjects,
} from '@/utils/supaQueries'
import { useMemoize } from '@vueuse/core'

export const useTasksStore = defineStore('tasks-store', () => {
  const tasks = ref<TasksWithProjects | null>(null)
  const task = ref<Task | null>(null)
  const loadTasks = useMemoize(async () => await tasksWithProjectsQuery)
  const loadTask = useMemoize(async (id: number) => {
    return taskQuery(id)
  })

  interface ValidateCacheParams {
    ref: typeof task | typeof tasks
    query: typeof taskQuery | typeof tasksWithProjectsQuery
    key: string
    loader: typeof loadTask | typeof loadTasks
  }

  const validateCache = ({ ref, query, key, loader }: ValidateCacheParams) => {
    if (ref.value) {
      const finalQuery = typeof query === 'function' ? query(Number(key)) : query
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

  const getTasks = async () => {
    tasks.value = null
    const { data, error, status } = await loadTasks()
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) tasks.value = data
    validateCache({
      ref: tasks,
      query: tasksWithProjectsQuery,
      key: 'tasks',
      loader: loadTasks,
    })
  }

  const getTask = async (id: string) => {
    task.value = null
    const { data, error, status } = await loadTask(Number(id))
    if (error) useErrorStore().setError({ error, customCode: status })
    if (data) task.value = data
    validateCache({
      ref: task,
      query: taskQuery,
      key: id,
      loader: loadTask,
    })
  }

  const updateTask = async () => {
    if (!task.value) return
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, projects, ...taskProps } = task.value
    await updateTaskQuery(taskProps, task.value.id)
  }

  const deleteTask = async (id: number) => {
    await deleteTaskQuery(id)
  }

  return {
    tasks,
    task,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
  }
})
