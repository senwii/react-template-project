import React from "react"
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom"

import routes, { basename } from './router'

function App() {
  return (
    <div className="root">
      <BrowserRouter basename={ basename }>
        <Switch>
              {
                routes.map((route:any, index) => (
                  <Route path={ route.path } key={ index } render={ props => (
                    <route.component {...props} routes={route.routes} />
                  )} />
                ))
              }
            </Switch>
      </BrowserRouter>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('app') as HTMLElement,
)
