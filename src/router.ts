import loadable from '@loadable/component'

const routes = [
  {
    path: '/hello',
    component: loadable(() => import(/* webpackChunkName: "hello" */ './views/Hello')),
  },
  {
    path: '/about',
    component: loadable(() => import(/* webpackChunkName: "about" */ './views/About')),
  },
]

export default routes
