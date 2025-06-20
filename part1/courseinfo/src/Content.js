import Part from './Part'

const Content = (props) => {
    return (
    <div>
       <Part part={props.part1.name} exercise={props.part1.exercises} />
      <Part part={props.part2.name} exercise={props.part2.exercises} />
      <Part part={props.part3.name} exercise={props.part3.exercises} />
    </div>
    )
}

export default Content