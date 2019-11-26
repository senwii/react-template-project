import React from "react"
import ReactDOM from 'react-dom'
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom"

import './style.less'

import routes, { basename } from './router'

function App() {
  return (
    <div className="root">
      <BrowserRouter basename={ basename }>
        <Link to="hello">Hello</Link>
        <span style={{ padding: '0 10px', lineHeight: '150px' }}>|</span>
        <Link to="about">About</Link>
          <Switch>
            {
              routes.map((route, index) => (
                <Route path={ route.path } key={ index } render={ props => (
                  <route.component {...props} routes={route.routes} />
                )} />
              ))
            }
          </Switch>
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(
	<App />,
	document.getElementById('app'),
)
