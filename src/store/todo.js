import { STORAGE_TODO_KEY } from '../constants'

const state = {
  todos: JSON.parse(window.localStorage.getItem(STORAGE_TODO_KEY) || '[]')
}

const mutations = {
  addTodo (state, todo) {
    state.todos.push(todo)
  },
  removeTodo (state, todo) {
    state.todos.splice(state.todos.indexOf(todo), 1)
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
    commit('addTodo', {
      uid: Date.now(),
      text,
      done: false
    })
  },
  removeTodo ({ commit }, todo) {
    commit('removeTodo', todo)
  },
  editTodo ({ commit }, { todo, value }) {
    commit('editTodo', {
      todo,
      text: value
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
    state.todo.filter(todo => todo.done)
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
