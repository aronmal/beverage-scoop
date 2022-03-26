import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import DrinkDiv from "./components/DrinkDiv";
import TheDrinkDiv from "./components/TheDrinkDiv";
import bubblesSetup from "./helpers/bubblesSetup";
import clock from "./helpers/clock";
import { configType, bubblesType } from "./interfaces";

function App() {

    const configHard: configType = JSON.parse('{"drinks":[{"drinkUuid":"dd8a23ba-a9fe-4839-a0a0-9e82c4ec602c","drinkname":"Fanta","type":"fanta","level":44,"percentage":20},{"drinkUuid":"2c788945-a7b1-4482-a17d-6474719ecefc","drinkname":"Cola","type":"cola","level":63,"percentage":40},{"drinkUuid":"ad78401d-ba83-480a-9d94-a577aaa67ac7","drinkname":"Sprite","type":"sprite","level":77,"percentage":20},{"drinkUuid":"d923376b-7563-4995-b9ec-6bf552adb923","drinkname":"Wasser","type":"water","level":26,"percentage":15}],"templates":[{}]}');

    const [time, setTime] = useState('00:00');
    const [config, setConfig] = useState<configType>(configHard);
    // const [config, setConfig] = useState<configType>({drinks: [], templates: [] });
    const [bubbles, setBubbles] = useState<bubblesType[]>([...configHard.drinks.map(({ drinkUuid }) => ({ drinkUuid, bubbles: [] })), { drinkUuid: 'drink', bubbles: [] }]);
    const [elem, setElem] = useState(<></>);

    useEffect(() => {
        bubblesSetup(setBubbles, config)
        setInterval(() => {
            setTime(() => clock())
        }, 1000);
    }, []);

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
                    {config.drinks.map((drink, i) => (
                        <DrinkDiv key={drink.drinkUuid} props={{bubbles, setConfig, drink, i}} />
                    ))}
                    <TheDrinkDiv props={{config, bubbles}} />
                </div>
            </div>
        </div>
    );
}

export default App;
