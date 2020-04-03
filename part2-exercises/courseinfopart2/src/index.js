import React from 'react'
import ReactDOM from 'react-dom'
import Course from './components/Course'
//COURSEINFO part 2

const App = () => { //root of the app

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web Development Curriculum!</h1>
      {courses.map(x => <Course course={x} key={x.id} />)
      /*renders one Course component for each course in courses array, with unique id to avoid console warning and problems*/ }
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))