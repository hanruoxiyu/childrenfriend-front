
// state (类似存储全局变量的数据)
// getters (提供用来获取state数据的方法)
// actions (提供跟后台接口打交道的方法，并调用mutations提供的方法)
// mutations (提供存储设置state数据的方法)

const state = {
  visitedViews: []
}

const getters = {
  visitedViews: (state, getters) => state.visitedViews
}

const mutations = {
  addVisitedView(state, payload) {
    if (state.visitedViews.some(item => item.path === payload.path)) return
    state.visitedViews.push(
      Object.assign({}, payload, {
        title: payload.meta.title || 'no-title'
      })
    )
  },
  delVisitedView(state, payload) {
    const index = state.visitedViews.findIndex(item => {
      return item.path === payload.path
    })
    state.visitedViews.splice(index, 1)
  },
  delAllVisitedView(state, payload) {
    const fixedTags = state.visitedViews.filter(item => item.meta.fixed)
    state.visitedViews = fixedTags
  },
  delOthersVisitedView(state, payload) {
    state.visitedViews = state.visitedViews.filter(item => {
      return item.meta.fixed || item.path === payload.path
    })
  }
}

export default {
  namespace: true,
  state,
  getters,
  mutations
}
