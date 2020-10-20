import { TODO_LIST, WORK_CONTENTS, CARDS, LOCAL_MINE_TAB_ITEMS } from '../constants'

const plugins = [
  store => {
    store.subscribe((mutation, state) => {
      const { todoModule, workModule } = state
      if (todoModule) {
        window.localStorage.setItem(TODO_LIST, JSON.stringify(todoModule.todos))
      }
      if (workModule) {
        window.localStorage.setItem(WORK_CONTENTS, JSON.stringify(workModule.contents))
        window.localStorage.setItem(CARDS, JSON.stringify(workModule.cards))
        window.localStorage.setItem(LOCAL_MINE_TAB_ITEMS, JSON.stringify(workModule.cards[0] || {}))
      }
    })
  }
]

export default plugins
