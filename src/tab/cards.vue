<template>
  <div class='cards-wrapper'>
    <div class="item-list"
      v-if="itemCardList.length"
    >
      <div class="item-card"
        :key="index"
        v-for="(item, index) in itemCardList"
        @click="handleLink(item)"
      >
        <i class="item-card-icon el-icon-edit" @click="handleEditCard(item, index)"></i>
        <div class="card-pic">
          <img :src="item.logo || 'https://file.ipadown.com/tophub/assets/images/media/appinn.com.png_120x120.png'" alt="">
        </div>
        <div class="card-title">
          {{ item.name }}
        </div>
        <div v-if="item.link" class="card-link">
          <a :href="item.link" target="_blank">跳转链接</a>
        </div>
        <div class="card-content">
          {{ item.content }}
        </div>
      </div>
      <div
        v-if="isShow"
        class="item-card my-add-item"
      >
        <i class="el-icon-plus" @click="handleAddCard()"></i>
      </div>
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
    return {
      activeIndex: 1
    }
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
      this.activeIndex = index
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
    handleLink () {
      // const { link } = item
      // if (!link) {
      //   return
      // }
      // window.open(link)
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
    .item-card {
      position: relative;
      margin-right: 10px;
      width: 16.6%;
      min-width: 120px;
      text-align: center;
      padding-right: 14px;
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
    .card-pic {
      width: 60px;
      height: 60px;
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
    .my-add-item {
      display: flex;
      justify-content: center;
      align-items: center;
      .el-icon-plus {
        font-size: 36px;
        color: #a29e9e;
      }
    }
    .card-title {
      font-size: 16px;
      font-weight: 600;
    }
    .card-type {

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
}
</style>
