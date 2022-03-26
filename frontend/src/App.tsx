import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSSProperties, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import buttonClicked from "./helpers/buttonClicked";
import clock from "./helpers/clock";
import randomNum from "./helpers/randomNum";
import { configType, bubblesType } from "./interfaces";

function App() {

    const colors = {
        Fanta: [31,98,54],
        Cola: [1,100,28],
        Sprite: [214,41,78],
        Wasser: [210,80,50],
        Special: [250,73,57],
        Beer: [27,75,55],
    }

    const configHard: configType = JSON.parse('{"drinks":[{"drinkUuid":"dd8a23ba-a9fe-4839-a0a0-9e82c4ec602c","drinkname":"Fanta","type":"fanta","level":44,"percentage":20},{"drinkUuid":"2c788945-a7b1-4482-a17d-6474719ecefc","drinkname":"Cola","type":"cola","level":63,"percentage":40},{"drinkUuid":"ad78401d-ba83-480a-9d94-a577aaa67ac7","drinkname":"Sprite","type":"sprite","level":77,"percentage":20},{"drinkUuid":"d923376b-7563-4995-b9ec-6bf552adb923","drinkname":"Wasser","type":"water","level":26,"percentage":15}],"templates":[{}]}');

    const [time, setTime] = useState('00:00');
    const [config, setConfig] = useState<configType>(configHard);
    // const [config, setConfig] = useState<configType>({drinks: [], templates: [] });
    const [bubbles, setBubbles] = useState<bubblesType[]>([...configHard.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })), { drinkUuid: 'drink', bubbles: [] }]);
    const [elem, setElem] = useState(<></>);

    useEffect(() => {
        setBubbles([...config.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })), { drinkUuid: 'drink', bubbles: [] }])
        bubblesSetup()
        setInterval(() => {
            setTime(() => clock())
        }, 1000);
    }, []);

    function bubblesSetup() {
        const bubbleConcurrency = 5
        setBubbles(() => {
            const result = [...config.drinks, { drinkUuid: 'drink' }].map(({ drinkUuid }) => {
                const thisBubbles: bubbleType[] = [];
                for (let i = 0; i < bubbleConcurrency; i++) {
                    const bubbleUuid = uuidv4()
                    const offsetTimout = Math.round(randomNum(0,75)) / 10
                    const size = `${Math.round((randomNum(0.5,1.5)) * 100) / 100}rem`
                    const left = `${Math.round(randomNum(10,90))}%`
                    const animation1 = `bubblesY 7.5s linear ${offsetTimout}s infinite`
                    const animation2 = `bubblesX .4s ease-in-out ${offsetTimout}s alternate infinite`
                    thisBubbles.push({ bubbleUuid, size, left, animation1, animation2 })
                }
                return { drinkUuid, bubbles: thisBubbles };
            });
            console.log(result)
            return result;
        });
    }

    return (
        <div id="body-div" className="flex-col">
            <div id="header-bar" className="flex-row">
                <p id="time">{ time }</p>
                <div id="header-right" className="flex-row">
                    <FontAwesomeIcon icon={faGear} spin />
                </div>
            </div>
            <div id="content" className="flex-col">
                { elem }
                <div id="content-div" className="flex-row">
                    {config.drinks.map(({ drinkUuid, drinkname, type, percentage, level }, i) => {
                        const transformWaveMax = -85
                        const transformWaveMin = -20
                        const transformWave = Math.round((level/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
                        const transformBrandMax = 125
                        const transformBrandMin = -50
                        const transformBrand = Math.round(((1-level/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
                        const match = bubbles.findIndex(e => e.drinkUuid === drinkUuid)
                        const thisBubbles = bubbles[match].bubbles || []
                        return (
                        <div key={ drinkUuid } className={`flex-row content-drink ${type}`}>
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
                                    {thisBubbles.map(({ bubbleUuid, size, left, animation1, animationFillMode, animation2 }) => {
                                        return (
                                            <div key={ bubbleUuid } className='bubble-div' style={{'--bubble-size': size, 'left': left, 'animation': animation2} as CSSProperties}>
                                                <div className='bubble' style={{'animation': animation1}}>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <p className="brand-name drink-name">{ drinkname }</p>
                            </div>
                        </div>
                    )})}
                    {['one'].map(() => {
                        const level = config.drinks.reduce((level, {percentage}) => level + percentage, 0)
                        const percent = config.drinks.map(({percentage}) => percentage).reduce((partialSum, a) => partialSum + a, 0)
                        const theColor = config.drinks.reduce((color, {drinkname, percentage}) => colors[drinkname].map((drinkColor, i) => Math.floor(drinkColor * (percentage/percent)) + color[i]), [0,0,0])
                        const transformWaveMax = -85
                        const transformWaveMin = -20
                        const transformWave = Math.round((level/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
                        const transformBrandMax = 125
                        const transformBrandMin = -50
                        const transformBrand = Math.round(((1-level/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
                        const match = bubbles.findIndex(e => e.drinkUuid === 'drink')
                        const thisBubbles = bubbles[match].bubbles || []
                        return (
                            <div key={ 'drink' } style={{'--bg': `hsl(${theColor[0]},${theColor[1]}%,${theColor[2]}%)`} as CSSProperties}>
                                <p style={{position: 'absolute', top: '0'}}>{ level + '%'}</p>
                                <div className="new2 flex-row drink-div">
                                    <div className="wave-trans animate" style={{'--transform-wave-trans': `${transformWave}%`, '--transform-brand-name': `${transformBrand}%`} as CSSProperties}>
                                        <div className="wave-rot animate">
                                            <div className="wave-color"></div>
                                        </div>
                                    </div>
                                    {thisBubbles.map(({ bubbleUuid, size, left, animation1, animationFillMode, animation2 }) => {
                                        return (
                                            <div key={ bubbleUuid } className='bubble-div' style={{'height': size, 'width': size, 'left': left, 'animation': animation1, 'animationFillMode': animationFillMode}}>
                                                <div className='bubble' style={{'height': size, 'width': size, 'animation': animation2,}}>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                                <button className="brand-name drink-name">
                                    <FontAwesomeIcon icon={faDroplet} />
                                </button>
                            </div>
                    )})}
                </div>
            </div>
        </div>
    );
}

export default App;
