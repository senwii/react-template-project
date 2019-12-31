import React from 'react'
import { Link } from "react-router-dom"

export default function About() {
    return (
        <div>
            /<Link to="/hello">Hello</Link>.
            This is the About page.
        </div>
    )
}
