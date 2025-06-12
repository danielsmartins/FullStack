import Header from './Header'
import Content from './Content'
import Total from './Total'


const App = () => {
   const course = 'Desenvolvimento de aplicação Half Stack'
   const parts = [
    {
      name: 'Fundamentos da biblioteca React',
      exercises: 10
    },
    {
      name: 'Usando props para passar dados',
      exercises: 7
    },
    {
      name: 'Estado de um componente',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content
        part1={parts[0]} 
        part2={parts[1]} 
        part3={parts[2]} 
      />
      <Total
        exercises1={parts[0].exercises}
        exercises2={parts[1].exercises}
        exercises3={parts[2].exercises}
      />
    </div>
  )
}

export default App