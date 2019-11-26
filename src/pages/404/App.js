import React from "react"
import ReactDOM from 'react-dom'

import './style.less'

import desc from './assets/404_not_found.png'

function App() {
  return (
    <div className="root">
      <div className="desc">
        <img src={ desc } />
      </div>
    </div>
  );
}

ReactDOM.render(
	<App />,
	document.getElementById('app'),
)
