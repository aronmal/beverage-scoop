import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSProperties } from "react";
import buttonClicked from '../helpers/buttonClicked';
import { bubblesType, configType, drinkType } from '../interfaces';
import Bubble from './Bubble';

function DrinkDiv({props: {bubbles, setConfig, drink: { drinkUuid, drinkname, type, percentage, level }, i}}: {props: {bubbles: bubblesType[], setConfig: React.Dispatch<React.SetStateAction<configType>>, drink: drinkType, i: number}}) {
    const transformWaveMax = -85
    const transformWaveMin = -20
    const transformWave = Math.round((level/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
    const transformBrandMax = 125
    const transformBrandMin = -50
    const transformBrand = Math.round(((1-level/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
    const match = bubbles.findIndex(e => e.drinkUuid === drinkUuid)
    const thisBubbles = bubbles[match].bubbles || []
    return (
    <div className={`flex-row content-drink ${type}`}>
        <div className="flex-col">
            <div className="drink-div value flex-col">
                <button className="percent-up" onClick={() => buttonClicked(setConfig, 'up', i)}>
                    <FontAwesomeIcon icon={faPlay} color='black' rotation={270} />
                </button>
                <p className="percentage">{ percentage + '%' }</p>
                <button className="percent-down" onClick={() => buttonClicked(setConfig, 'down', i)}>
                    <FontAwesomeIcon icon={faPlay} color='black' rotation={90} />
                </button>
                <div className="wave-trans" style={{'--transform-wave-trans': `${transformWave}%`, '--transform-brand-name': `${transformBrand}%`} as CSSProperties}>
                    <div className="wave-rot">
                        <div className="wave-color"></div>
                    </div>
                </div>
                {thisBubbles.map((bubble) => (
                    <Bubble key={bubble.bubbleUuid} props={bubble} />
                ))}
            </div>
            <p className="brand-name drink-name">{ drinkname }</p>
        </div>
    </div>
  )
}

export default DrinkDiv