import { STORAGE_TODO_KEY, WORK_CONTENTS } from '../constants'

const plugins = [
  store => {
    store.subscribe((mutation, state) => {
      const { todoModule, workModule } = state
      if (todoModule) {
        window.localStorage.setItem(STORAGE_TODO_KEY, JSON.stringify(todoModule.todos))
      }
      if (workModule) {
        window.localStorage.setItem(WORK_CONTENTS, JSON.stringify(workModule.contents))
      }
    })
  }
]

export default plugins
