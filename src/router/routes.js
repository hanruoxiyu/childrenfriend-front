import Layout from '../layout'

//配置跳转路由和文件的关系，这里就是左侧的目录信息
export const asyncRoutes = [
  {
    path: '/retask',
    name: 'retask',
    component: Layout,
    redirect: '/retask',
    children: [{
      path: 'retask',
      name: 'retask',
      component: () => import('../views/reminder/retask.vue'),
      meta: {
        title: '学习提醒',
        icon: 'el-icon-time',
        fixed: true
      }
    }]
  },
  {
    path: '/knowledge',
    name: 'FormTable',
    component: Layout,
    redirect: '/knowledge/table-classic',
    meta: {
      title: '智能答疑',
      icon: 'vue-dsn-icon-biaoge'
    },
    children: [
      {
        path: 'kgqa',
        name: 'KGQA',
        component: () => import('../views/knowledge/KGQA'),
        meta: {
          title: '智能答疑'
        }
      }
    ]
  },
  {
    path: '/score',
    name: 'Score',
    component: Layout,
    redirect: '/image/image-cropper',
    meta: {
      title: '自助考核',
      icon: 'vue-dsn-icon-picture'
    },
    children: [
      {
        path: '/core',
        name: 'Score',
        component: () => import('../views/score/score'),
        meta: {
          title: '成绩记录'
        }
      },
      {
        path: 'question',
        name: 'Question',
        component: () => import('../views/score/Question'),
        meta: {
          title: '考题管理'
        }
      },

    ]
  },
  {
    path: '/zuozi',
    name: 'zuozi',
    component: Layout,
    redirect: '/zuozi',
    children: [{
      path: 'zuozi',
      name: 'zuozi',
      component: () => import('../views/zuozi/zuozi'),
      meta: {
        title: '坐姿矫正',
        icon: 'el-icon-s-custom',
        fixed: true
      }
    }]
  },
  {
    path: '/monitor',
    name: 'monitor',
    component: Layout,
    redirect: '/monitor',
    children: [{
      path: 'monitor',
      name: 'Monitor',
      component: () => import('../views/monitor/monitor'),
      meta: {
        title: '家长监控',
        icon: 'el-icon-video-camera',
        fixed: true
      }
    }]
  },
  {
    path: '/map',
    name: 'Map',
    component: Layout,
    redirect: '/map',
    children: [{
      path: 'map',
      name: 'Map',
      component: () => import('../views/map/Map'),
      meta: {
        title: '游学出行',
        icon: 'el-icon-map-location',
        fixed: true
      }
    }]
  },
]
