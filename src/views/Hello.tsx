import React from 'react'
import { Link } from "react-router-dom"

export default function Hello() {
  return (
    <div>
      /<Link to="/about">About</Link>.
      Hello World.
    </div>
  )
}
