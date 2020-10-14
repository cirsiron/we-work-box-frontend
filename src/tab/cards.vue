<template>
  <div class='cards-wrapper'>
    <div class="item-list"
      v-if="itemCardList.length"
    >
      <div class="item-card"
        :key="index"
        v-for="(item, index) in itemCardList"
      >
        <div class="card-mask" 
          @click="handleLink(item.link)"
        ></div>
        <i class="item-card-icon el-icon-edit" @click="handleEditCard(item, index)"></i>
        <div class="card-pic">
          <img :src="item.logo || 'http://vit.hp.guahao-inc.com/favicon.ico'" alt="">
        </div>
        <div class="card-title">
          {{ item.name }}
        </div>
        <!-- <div v-if="item.link" class="card-link">
          <a :href="item.link" target="_blank">跳转链接</a>
        </div> -->
        <div class="card-content">
          {{ item.content }}
        </div>
      </div>
      <div
        v-if="isShow"
        class="item-card my-add-item"
        @click="handleAddCard()"
      >
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div
      v-else-if="isShow"
      class="item-card my-add-item"
      @click="handleAddCard()"
    >
      <i class="el-icon-plus"></i>
    </div>
    <div
      v-else
      class="no-data"
    >
      <slot>
        oops! 暂无内容
      </slot>
    </div>
  </div>
</template>
<script>
/**
* Created by huanghui on 2020/10/13
* 文件功能描述: 卡片
*/
import { TAB_CONTENT } from '../constants'

export default {
  props: {
    card: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  watch: {
  },
  computed: {
    itemCardList () {
      return this.data
    },
    isShow () {
      return +this.card.value === +TAB_CONTENT['我的'] // 如果是'我的'类型会显示，其他不显示
    }
  },
  mounted () {
  },
  methods: {
    resetForm (val) {
      this.$emit('resetForm', val)
    },
    // 编辑Card
    handleEditCard (item = {}, index = 1) {
      this.$emit('onDialogCardVisible', true)
      this.$emit('setActiveIndex', index)
      this.$nextTick(() => {
        const edit = 2
        this.resetForm(edit)
        this.$emit('onEditCardForm', JSON.parse(JSON.stringify(item)))
      })
    },
    // 新增
    handleAddCard () {
      this.$emit('onDialogCardVisible', true)
      this.$nextTick(() => {
        const add = 1
        this.resetForm(add)
      })
    },
    handleLink (link) {
      if (/http/.test(link)) {
        window.open(link)
      }
    }
  }
}
</script>
<style lang='scss'>
.cards-wrapper {
  .no-data {
    text-align: center;
    margin: 100px;
    color: #409EFF;
  }
  .item-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    .card-pic {
      width: 60px;
      height: 46px;
      margin: 10px auto 10px;
      position: relative;
      img {
        width: 80%;
        padding: 10%;
        border-radius: 100%;
        overflow: hidden;
        border: 1px solid #f3f3f3;
      }
    }
    .card-title {
      font-size: 16px;
      height: 40px;
      font-weight: 600;
      line-height: 40px;
    }
    .card-type {

    }
    .card-content {
      max-height: 46px;
      overflow: hidden;
    }
    .card-link {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      a {
        color: #409EFF;
      }
    }
  }
  .item-card {
    position: relative;
    flex: 1;
    margin: 10px;
    max-width: 160px;
    height: 180px;
    min-width: 140px;
    text-align: center;
    border-radius: 6px;
    padding: 0 10px 10px 10px;
    border: 1px solid #eee;
    &:hover {
      box-shadow: 0 2px 10px 0 rgba(0,0,0,.15);
    }
    .card-mask {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 80%;
      z-index: 1;
      cursor: pointer;
    }
    .item-card-icon {
      display: none;
      position: absolute;
      right: 8px;
      top: 8px;
      font-size: 16px;
      cursor: pointer;
    }
    a {
      text-decoration: none;
    }
    &:hover {
      .item-card-icon {
        display: block;
      }
    }
  }
  .my-add-item {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .el-icon-plus {
      font-size: 36px;
      color: #a29e9e;
    }
  }
}
</style>
