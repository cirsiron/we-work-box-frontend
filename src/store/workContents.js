import { WORK_CONTENTS, CARDS, TAB_CONTENT_LIST } from '../constants'

const defaultContents = TAB_CONTENT_LIST.map((i) => {
  const filter = ['我的', '推荐']
  return {
    ...i,
    value: String(i.value),
    name: String(i.name),
    closable: filter.indexOf(i.name) === -1
  }
})

const cardState = {
  cards: JSON.parse(window.localStorage.getItem(CARDS)) || []
}

const state = {
  contents: JSON.parse(window.localStorage.getItem(WORK_CONTENTS) || JSON.stringify(defaultContents)),
  ...cardState
}

const cardMutations = {
  addCard (state, card) {
    state.cards.unshift(card)
  },
  removeCard (state, card) {
    state.cards.splice(state.cards.indexOf(card), 1)
  },
  editCard (state, { cards }) {
    // state.cards =
  }
}

const mutations = {
  removeContent (state, content) {
    state.contents.splice(state.contents.indexOf(content), 1)
  },
  setContents (state, contents) {
    state.contents = contents || []
  },
  ...cardMutations
}

const cardActions = {
  addCard ({ commit }, card) {
    commit('addCard', card)
  },
  removeCard ({ commit }, card) {
    commit('removeCard', card)
  }
}

const actions = {
  removeContent ({ commit }, content) {
    commit('removeContent', content)
  },
  setContents ({ commit }, contents) {
    commit('setContents', contents)
  },
  ...cardActions
}

export default {
  state,
  mutations,
  actions
}
