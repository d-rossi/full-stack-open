const App = () => {
  const now = new Date()
  const num1 = 10
  const num2 = 20
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>{num1} + {num2} = {num1 + num2}</p>
    </div>
  )
}

export default App