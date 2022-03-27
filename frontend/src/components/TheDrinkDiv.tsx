import { faDroplet } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CSSProperties } from 'react'
import percentage from '../helpers/percentage'
import { bubblesType, configType } from '../interfaces'
import Bubble from './Bubble'

const colors = {
    Fanta: [31,98,54],
    Cola: [1,100,28],
    Sprite: [214,41,78],
    Wasser: [210,80,50],
    Special: [250,73,57],
    Beer: [27,75,55],
}

function TheDrinkDiv({props: { config, bubbles }}: { props: {config: configType, bubbles: bubblesType[]}}) {
    const percent = percentage(config)
    const theColor = config.drinks.reduce((color, {drinkname, percentage}) => colors[drinkname].map((drinkColor, i) => Math.floor(drinkColor * (percentage/percent)) + color[i]), [0,0,0])
    const transformWaveMax = -85
    const transformWaveMin = -20
    const transformWave = Math.round((percent/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
    const match = bubbles.findIndex(e => e.drinkUuid === 'drink')
    const thisBubbles = bubbles[match].bubbles || []
    return (
    <>
        <div className="drink-div result result-div" style={{'--bg': `hsl(${theColor[0]},${theColor[1]}%,${theColor[2]}%)`} as CSSProperties}>
            <p className='percentage'>{ percent + '%'}</p>
            <div className="wave-trans animate" style={{'--transform-wave-trans': `${transformWave}%`} as CSSProperties}>
                <div className="wave-rot animate">
                    <div className="wave-color"></div>
                </div>
            </div>
            {thisBubbles.map((bubble) => (
                <Bubble key={bubble.bubbleUuid} props={bubble} />
            ))}
        </div>
        <button className={`brand-name result`}  style={{'--bg': `hsl(${theColor[0]},${theColor[1]}%,${theColor[2]}%)`} as CSSProperties}>
            <FontAwesomeIcon icon={faDroplet} />
        </button>
    </>
)}

export default TheDrinkDiv;