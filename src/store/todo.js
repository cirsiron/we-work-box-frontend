import { TODO_LIST } from '../constants'

const state = {
  todos: JSON.parse(window.localStorage.getItem(TODO_LIST) || '[]')
}

const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
  },
  removeCheckedTodo (state, unchecked) {
    state.todos = unchecked
  },
  editTodo (state, { todo, text = todo.text, done = todo.done }) {
    todo.text = text
    todo.done = done
  },
  checkedAllTodos (state, done) {
    state.todos = state.todos.map((todo) => {
      return {
        ...todo,
        done
      }
    })
  }
}

const actions = {
  addTodo ({ commit }, text) {
    const date = new Date()
    const dateObj = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    commit('addTodo', {
      uid: Date.now(),
      text,
      done: false,
      rangeDate: [dateObj, dateObj]
    })
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },
  removeCheckedTodo ({ commit, state }) {
    const unchecked = state.todos.filter((item) => !item.done)
    commit('removeCheckedTodo', unchecked)
  },
  editTodo ({ commit }, { todo, value, rangeDate }) {
    commit('editTodo', {
      todo,
      text: value,
      rangeDate
    })
  },
  toggleTodo ({ commit }, todo) {
    commit('editTodo', {
      todo,
      done: !todo.done
    })
  },
  checkedAllTodos ({ commit }, done) {
    commit('checkedAllTodos', done)
  },
  clearCompleted ({ state, commit }) {
    state.todos.filter(todo => todo.done)
      .forEach(todo => {
        commit('removeTodo', todo)
      })
  }
}

export default {
  state,
  mutations,
  actions
}
