
export const SHOW_TYPE = 'SHOW_TYPE' // 展示项目类型

export const STORAGE_TODO_KEY = 'TODO_LIST' // todo
export const WORK_CONTENTS = 'WORK_CONTENTS' // 工作项目

export const CARDS = 'CARDS' // 工作卡片

export const TAB_CONTENT = {
  '通用': -1,
  '我的': 0, // 我的
  '产品': 1, // 产品
  '设计': 2, // 设计
  '前端': 3, // 前端
  '后端': 4, // 后端
  '测试': 5, // 测试
  '推荐': 6 // 推荐
}

export const TAB_CONTENT_LIST = Object.keys(TAB_CONTENT).map((i) => {
  return {
    name: i,
    value: TAB_CONTENT[i]
  }
})

export const TAB_CONTENT_MAP = Object.fromEntries(
  Object.entries(TAB_CONTENT)
    .map(([ key, val ]) => {
      return [val, key]
    })
)
