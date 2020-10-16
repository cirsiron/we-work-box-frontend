
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
      state.cards[tabIndex] = []
    }
    state.cards[tabIndex].unshift(card)
  },
  removeCard (state, {
    tabIndex,
    cardIndex
  }) {
    if (!state.cards[tabIndex]) {
      state.cards[tabIndex] = []
    }
    state.cards[tabIndex].splice(cardIndex, 1)
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
  addCard ({ commit }, {
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
      let mineTabItems = storage.get(LOCAL_MINE_TAB_ITEMS)
      if (!mineTabItems) {
        mineTabItems = []
      }
      mineTabItems.push(card)
      storage.set(LOCAL_MINE_TAB_ITEMS, mineTabItems)
      type.splice(type.indexOf(0), 1)
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
    id
  }) {
    commit('removeCard', {
      tabIndex,
      cardIndex
    })
    if (!id) {
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
