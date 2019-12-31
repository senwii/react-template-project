import loadable from "@loadable/component"

const routes = [
  {
    path: '/hello',
    component: loadable(() => import(/* webpackChunkName: "hello" */ './views/Hello.jsx')),
  },
  {
    path: '/about',
    component: loadable(() => import(/* webpackChunkName: "about" */ './views/About.jsx')),
  },
]

const basename = '/react-template-project/'

export {
  basename,
}

export default routes
