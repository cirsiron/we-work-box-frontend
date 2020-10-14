<template>
  <div class='header-wrapper'>
    <div class="logo">
      <img src="../assets/imgs/logo.png" width="40px" height="40px" alt="">
      <div class="todo-btn">
        <el-badge :value="todoCount" class="item">
          <el-button
            round
            size="small"
            @click="handleDrawerTodo"
          >今日待办</el-button>
        </el-badge>
      </div>
    </div>
    <div class="search">
      <el-input
        id="search-input"
        ref="input"
        clearable
        placeholder="输入关键字进行搜索"
        prefix-icon="el-icon-search"
        v-model="searchVal"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleSearch"
      />
    </div>
    <div class="user">
      <div class="calendar-btn">
        <el-button
          round
          size="small"
          @click="handleDrawerCalendar"
        >查看日历</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/**
* Created by huanghui on 2020/09/24
* 文件功能描述:头部文件
*/
import { mapState } from 'vuex'
import { fetchCard } from '../api'

export default {
  data () {
    return {
      searchVal: ''
    }
  },
  watch: {
  },
  computed: {
    ...mapState({
      todos: state => state.todoModule.todos
    }),
    todoCount () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  mounted () {
    this.focusInput()
    window.addEventListener('keydown', (e) => {
      const { keyCode } = e
      const ctrlKey = e.ctrlKey || e.metaKey
      const altKey = e.altKey
      // alt + space / ctrl + space
      if ((altKey || ctrlKey) && keyCode === 32) {
        this.focusInput()
      }
    })
  },
  methods: {
    focusInput () {
      try {
        this.$refs.input.focus()
      } catch (e) {
        console.log(e)
      }
    },
    handleFocus () {
      const ele = this.$refs.input.$el
      ele.className = (ele.className || '').replace(/\s{2}/g, ' ')
      ele.className = !ele.className ? 'focus' : ele.className + ' ' + 'focus'
    },
    handleBlur () {
      const ele = this.$refs.input.$el
      ele.className = ele.className.replace(/focus/g, '')
    },
    handleSearch () {
      const val = this.searchVal.replace(/^\s*|\s*$/g, '')
      if (!val) {
        this.$emit('setValBool', false)
        return
      }
      this.$emit('setValBool', true)
      fetchCard.query({
        q: val
      }).then((res) => {
        const data = (res || []).map((item) => {
          const { _source, _id } = item
          return {
            ..._source,
            id: _id
          }
        })
        this.$emit('setSearchItems', data)
      }).catch((err) => {
        this.$emit('setSearchItems', [])
        console.log(err)
      })
    },
    handleDrawerTodo () {
      this.$emit('handleDrawerTodo', true)
    },
    handleDrawerCalendar () {
      this.$emit('handleDrawerCalendar', true)
    }
  }
}
</script>
<style lang='scss'>
.header-wrapper {
  display: flex;
  height: 80px;
  align-items: center;
  box-shadow: 0 10px 40px -10px #a2aeb933;
  .logo, .user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    line-height: 40px;
  }
  .search {
    width: calc(100% - 400px);
    display: flex;
    justify-content: center;
    .el-input {
      width: 80%;
      text-align: center;
    }
  }
  .todo-btn, .calendar-btn {
    margin-left: 12px;
  }
}
</style>
