import { CSSProperties, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import buttonClicked from "./helpers/buttonClicked";
import clock from "./helpers/clock";
import randomNum from "./helpers/randomNum";
import { drinkType, configType, bubblesType } from "./interfaces";

function App() {

    const configHard: configType = JSON.parse('{"drinks":[{"drinkUuid":"dd8a23ba-a9fe-4839-a0a0-9e82c4ec602c","drinkname":"Fanta","type":"fanta","level":44,"percentage":20},{"drinkUuid":"2c788945-a7b1-4482-a17d-6474719ecefc","drinkname":"Cola","type":"cola","level":63,"percentage":40},{"drinkUuid":"ad78401d-ba83-480a-9d94-a577aaa67ac7","drinkname":"Sprite","type":"sprite","level":77,"percentage":20},{"drinkUuid":"d923376b-7563-4995-b9ec-6bf552adb923","drinkname":"Wasser","type":"water","level":26,"percentage":15}],"templates":[{}]}');

    const [time, setTime] = useState('00:00');
    const [config, setConfig] = useState<configType>(configHard);
    // const [config, setConfig] = useState<configType>({drinks: [], templates: [] });
    const [bubbles, setBubbles] = useState<bubblesType[]>(configHard.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })));
    const [elem, setElem] = useState(<></>);

    useEffect(() => {
        // setConfig(configHard)
        bubblesSetup()
        setInterval(() => {
            setTime(() => clock())
        }, 1000);
    }, []);

    // console.log(configHard.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })))
    function bubblesSetup() {
        // setBubbles(config.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })))
        {config.drinks.map(({ drinkUuid }, i) => {
            const match = bubbles.findIndex(e => e.drinkUuid === drinkUuid)
            setInterval(() => {
                const offsetTimout = Math.round(randomNum(0,2000))
                setTimeout(() => {
                    const bubbleUuid = uuidv4()
                    const size = `${Math.round((randomNum(0.5,1.5)) * 100) / 100}rem`
                    const left = `${Math.round(randomNum(10,90))}%`
                    const animation1 = 'bubblesY 5s linear'
                    const animationFillMode = 'forwards'
                    const animation2 = 'bubblesX .4s ease-in-out alternate infinite'
                    setBubbles(e => Object.assign([...e], {
                        [match]: {
                            ...e[match],
                            bubbles: [...e[match].bubbles, { bubbleUuid, size, left, animation1, animationFillMode, animation2 }]
                        }
                    }))
                    setTimeout(() => {
                        setBubbles(e => Object.assign([...e], {
                            [match]: {
                                ...e[match],
                                bubbles: [...e[match].bubbles.filter(e => e.bubbleUuid !== bubbleUuid)]
                            }
                        }))
                    }, 5000)
                }, offsetTimout)
            }, 1000);
        })}
    }

    useEffect(() => {
        setBubbles(config.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })))
    }, [config]);

    return (
        <div id="body-div" className="flex-col">
            <div id="header-bar" className="flex-row">
                <p id="time">{ time }</p>
                <div id="header-right" className="flex-row">
                {config.drinks.map(({ drinkUuid, drinkname, type, level }) => {
                    const transformWaveMax = -85
                    const transformWaveMin = -20
                    const transformWave = Math.round((level/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
                    return (
                        <div key={ drinkUuid } className={`flex-row drink-level ${type}`} style={{'--transform-wave-trans': `${transformWave}%`} as CSSProperties}>
                            <div className="drink-div flex-col">
                                <p className="level-percent">{ level + '%' }</p>
                                <div className="wave-trans">
                                    <div className="wave-rot">
                                        <div className="wave-color"></div>
                                    </div>
                                </div>
                            </div>
                            <p className="drink-name">{ drinkname }</p>
                        </div>
                )})}
                </div>
            </div>
            <div id="content" className="flex-col">
                { elem }
                <div id="content-div" className="flex-row">
                {config.drinks.map(({ drinkUuid, drinkname, type, percentage }, i) => {
                    const transformWaveMax = -85
                    const transformWaveMin = -20
                    const transformWave = Math.round((percentage/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
                    const transformBrandMax = 125
                    const transformBrandMin = -50
                    const transformBrand = Math.round(((1-percentage/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
                    const match = bubbles.findIndex(e => e.drinkUuid === drinkUuid)
                    const thisBubbles = bubbles[match].bubbles || []
                    return (
                    <div key={ drinkUuid } className={`flex-row content-drink ${type}`} style={{'--transform-wave-trans': `${transformWave}%`, '--transform-brand-name': `${transformBrand}%`} as CSSProperties}>
                        <div className="drink-div flex-col">
                            <p className="brand-name drink-name">{ drinkname }</p>
                            <div className="wave-trans">
                                <div className="wave-rot">
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
                        <div className="value grid-3-col">
                            <button className="percent-up" onClick={e => buttonClicked(e, 'up', i)}><span>&lt;</span></button>
                            <p className="percentage">{ percentage + '%' }</p>
                            <button className="percent-down" onClick={e => buttonClicked(e, 'down', i)}><span>&gt;</span></button>
                        </div>
                    </div>
                )})}
                </div>
            </div>
        </div>
    );
}

export default App;
