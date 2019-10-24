import React, { useState, useRef } from 'react'
import ReactDOM from 'react-dom'

import './style.less'

const App = () => {
	return (
		<div className="root">
      Hello World
    </div>
	)
}

ReactDOM.render(
	<App />,
	document.getElementById('app'),
)
