<template>
<div class='home-wrapper'>
  <div class="todo-flex">
    <div class="todo-title-wrapper">
      <div class="todos-title">待办事项</div>
      <el-progress class="todo-done-progress" :text-inside="true" :stroke-width="6" status="success" :percentage="percentage"></el-progress>
      <el-input placeholder="请输入新todo"
        size="large"
        v-model="newTodo"
        v-on:keyup.enter.native="handleAddNewTodo"
      >
        <template slot="prepend">
          <el-checkbox v-model="allChecked"></el-checkbox>
        </template>
      </el-input>
    </div>
  </div>
  <div class="todo-flex ">
    <div class="todo-list-wrapper">
      <div class="todo-list">
        <div class="todo-item-wrapper" :key="index" v-for="(item, index) in todos">
            <div class="todo-item">
              <el-checkbox :value="item.done" @change="toggleTodo(item)"></el-checkbox>
              <el-input :value="item.text" @input="(val) => editTodo({ todo: item, value: val })"></el-input>
              <i class="el-icon-delete" @click="removeTodo(item)"></i>
            </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
/**
* Created by huanghui on 2020/09/29
* 文件功能描述: todo list
*/

import { mapActions } from 'vuex'

const filters = {
  all: todos => todos,
  active: todos => todos.filter(todo => !todo.done),
  completed: todos => todos.filter(todo => todo.done)
}

export default {
  data () {
    return {
      visibility: this.filter,
      newTodo: '' // 新todo内容
    }
  },
  computed: {
    percentage () {
      if (!this.todos.length) {
        return 0
      }
      const done = this.todos.filter((i) => {
        return i.done
      })
      const num = (done.length / this.todos.length) * 100
      return +(num.toFixed(0)) || 0
    },
    todos () {
      return this.$store.state.todoModule.todos
    },
    // 是否全部完成
    allChecked: {
      get () {
        return this.todos.every(todo => todo.done)
      },
      set (checked) {
        this.checkedAllTodos(checked)
      }
    },
    filteredTodo () {
      return filters[this.visibility](this.todos)
    },
    // 还未完成
    remaining () {
      return this.todos.filter(todo => !todo.done).length
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions([
      'clearCompleted',
      'removeTodo',
      'toggleTodo',
      'editTodo',
      'checkedAllTodos'
    ]),
    handleAddNewTodo () {
      const text = this.newTodo.trim()
      if (text) {
        this.$store.dispatch('addTodo', text)
      }
      this.newTodo = ''
    }
  },
  filters: {
    pluralize: (n, w) => n === 1 ? w : (w + 's'),
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  }
}
</script>
<style lang='scss'>
.home-wrapper {
  .todo-flex {
    display: flex;
    justify-content: center;
  }
  .todo-title-wrapper {
    width: 80%;
    .el-input-group,
    .el-progress {
      width: 93%;
    }
    .todos-title {
      margin: 30px 0;
      color: #4dba87 !important;
      letter-spacing: -0.02em !important;
      caret-color: #4dba87 !important;
      font-size: 46px !important;
      text-align: center;
      opacity: 0.6;
    }
    .el-progress-bar__innerText {
      display: none;
    }
  }
  .todo-list-wrapper {
    width: 80%;
    margin-top: 20px;
    padding-left: 21px;
    height: calc(100vh - 242px);
    overflow: auto;
  }
  .todo-done-progress {
    opacity: 0.4;
  }
  .todo-item-wrapper {
    .el-divider--horizontal {
      margin: 8px 0;
    }
  }
  .todo-item {
    position: relative;
    display: flex;
    margin-bottom: 8px;
    .el-checkbox {
      display: flex;
      align-items: center;
    }
    .el-input {
      margin-left: 12px;
      width: 88%;
    }
    .el-icon-delete {
      display: none;
      font-size: 20px;
      align-items: center;
      margin-left: 8px;
      cursor: pointer;
      color: #909399;
    }
    &:hover {
      .el-icon-delete {
        display: flex;
      }
    }
  }
}
</style>
