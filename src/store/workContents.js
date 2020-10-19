
import Vue from 'vue'
import { CARDS, TAB_CONTENT_LIST, SHOW_TYPE, LOCAL_MINE_TAB_ITEMS } from '../constants'
import workContents from '../../mock/workContents.js'
import { fetchCard } from '../api'
import { storage } from '../utils'

const vm = new Vue()

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

const comments = JSON.parse(JSON.stringify(defaultContents))
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
    if (!state.cards[tabIndex]) {
      state.cards[tabIndex] = {}
    }
    // 默认
    if (+tabIndex === 0) {
      if (!state.cards[tabIndex]['默认']) {
        state.cards[tabIndex]['默认'] = []
      }
      state.cards[tabIndex]['默认'].unshift(card)
    } else {
      state.cards[tabIndex].unshift(card)
    }
  },
  removeCard (state, {
    tabIndex,
    cardIndex,
    tabName
  }) {
    if (!state.cards[tabIndex]) {
      state.cards[tabIndex] = []
    }
    if (tabName) {
      state.cards[tabIndex][tabName].splice(cardIndex, 1)
    } else {
      state.cards[tabIndex].splice(cardIndex, 1)
    }
  },
  editCard (state, { card, tabIndex, cardIndex }) {
    if (!state.cards[tabIndex]) {
      state.cards[tabIndex] = []
    }
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
  addCard ({ commit, state }, {
    card,
    tabIndex,
    callback
  }) {
    if (!card) {
      return
    }
    commit('addCard', {
      card,
      tabIndex
    })
    // 筛选出 我的 项目不进行提交 直接存储本地
    let { type = [] } = card
    if (type.includes(0)) {
      const { cards } = state
      storage.set(LOCAL_MINE_TAB_ITEMS, cards[0] || {})
      type.splice(type.indexOf(0), 1)
    }
    if (type.length === 0) {
      callback && callback()
      return
    }
    fetchCard.add({
      ...card,
      type
    }).then(() => {
      vm.$message.success('添加成功')
      callback && callback()
    }).catch((err) => {
      vm.$message.error('添加异常')
      console.log(err)
    })
  },
  removeCard ({ commit }, {
    tabIndex,
    cardIndex,
    callback,
    id,
    tabName
  }) {
    commit('removeCard', {
      tabIndex,
      cardIndex,
      tabName
    })
    if (!id || tabName) {
      callback && callback()
      return
    }
    fetchCard.remove({
      id
    }).then(() => {
      vm.$message.success('删除成功')
      callback && callback()
    }).catch((err) => {
      vm.$message.error('删除异常')
      console.log(err)
    })
  },
  editCard ({ commit }, {
    tabIndex,
    cardIndex,
    card,
    id,
    callback
  }) {
    commit('editCard', {
      tabIndex,
      cardIndex,
      card
    })
    // 远程更新
    fetchCard.modify({
      id,
      card
    }).then((res) => {
      vm.$message.success('更新成功')
      callback && callback()
    }).catch((err) => {
      vm.$message.success('更新异常')
      console.log(err)
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
