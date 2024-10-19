const Header = ({text}) => (
    <>
      <h2>{text}</h2>
    </>
  )
  
  const Part = ({name, exercises}) => (
    <>
      <p>{name} {exercises}</p>
    </>
  )
  
  const Content = ({parts}) => {
    return (
    <>
    {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </>
    )
  }
  
  const Total = ({parts}) => (
    <>
      <strong><p>total of {parts.reduce((accumulator, part) => accumulator + part.exercises, 0)} exercises</p></strong>
    </>
  )

const Course = ({course}) => {
    return (
      <>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }

  export default Course