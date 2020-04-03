import React from 'react'

const Course = (props) => {
    console.log('Course props', props)
    return (
        <div>
            <Header name={props.course.name} />
            <Content parts={props.course.parts} />
            <Total parts={props.course.parts} />
        </div>
    )
}

const Header = (props) => { //renders the name of the course
    console.log('header props', props)
    return (
        <h2>{props.name}</h2>
    )
}

const Content = (props) => { //renders the parts and their number of exercises
    console.log('Content props', props)
    return (
        <div>
            {props.parts.map(x => <Part part={x} key={x.id} />)}
        </div>

    )
}

const Part = (props) => {
    console.log('Part props', props)
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Total = (props) => { //renders the total number of exercises by summing item.exercises for the whole parts array
    return (
        <p><b>Number of exercises {props.parts.reduce((result, item) => (result + item.exercises), 0)}</b></p>
    )
}

export default Course;