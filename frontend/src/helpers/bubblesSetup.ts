import React from 'react'
import { v4 as uuidv4 } from "uuid";
import { bubblesType, bubbleType, configType } from '../interfaces';
import randomNum from './randomNum';

function bubblesSetup(setBubbles: React.Dispatch<React.SetStateAction<bubblesType[]>>, config: configType) {
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
        return result;
    });
}

export default bubblesSetup