import { WORK_CONTENTS, CARDS, TAB_CONTENT_LIST, SHOW_TYPE } from '../constants'
import workContents from '../../mock/workContents.js'
// this.fetchCards()
const filter = ['通用', '我的', '推荐']
const defaultContents = TAB_CONTENT_LIST.map((i) => {
  return {
    ...i,
    value: String(i.value),
    name: String(i.name),
    closable: filter.indexOf(i.name) === -1
  }
})

const cardState = {
  cards: JSON.parse(window.localStorage.getItem(CARDS)) || workContents
}

const comments = JSON.parse(window.localStorage.getItem(WORK_CONTENTS) || JSON.stringify(defaultContents))
const commentFilter = comments.filter(i => {
  return +window.localStorage.getItem(SHOW_TYPE) === +i.value || filter.indexOf(i.name) !== -1
})

const state = {
  contents: commentFilter,
  ...cardState
}

const cardMutations = {
  addCard (state, {
    card,
    tabIndex
  }) {
    state.cards[tabIndex].unshift(card)
  },
  removeCard (state, {
    tabIndex,
    cardIndex
  }) {
    state.cards[tabIndex].splice(cardIndex, 1)
  },
  editCard (state, { card, tabIndex, cardIndex }) {
    state.cards[tabIndex].splice(cardIndex, 1, card)
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
  addCard ({ commit }, {
    tabIndex, card, cardIndex
  }) {
    if (!card) {
      return
    }
    commit('addCard', {
      card,
      tabIndex,
      cardIndex
    })
  },
  removeCard ({ commit }, {
    tabIndex,
    cardIndex
  }) {
    commit('removeCard', {
      tabIndex,
      cardIndex
    })
  },
  editCard ({ commit }, {
    tabIndex,
    cardIndex,
    card
  }) {
    commit('editCard', {
      tabIndex,
      cardIndex,
      card
    })
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
