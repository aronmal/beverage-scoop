import { bubbleType } from '../interfaces'

function Bubble({props: { size, left, animation1, animation2 }}: { props: bubbleType}) {
  return (
    <div className='bubble-div' style={{'height': size, 'width': size, 'left': left, 'animation': animation1}}>
        <div className='bubble' style={{'height': size, 'width': size, 'animation': animation2}}>
        </div>
    </div>
  )
}

export default Bubble;