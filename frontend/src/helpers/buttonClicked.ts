// import errorMessage from "./errorMessage"

import { configType } from "../interfaces";

// import fetchLoad from "./fetchLoad"
type directionType = 'up' | 'down'

export default async function buttonClicked(setConfig: React.Dispatch<React.SetStateAction<configType>>, direction: directionType, i: number) {
    setConfig(e => {
        if (direction === 'up')
            return { ...e, drinks: Object.assign([...e.drinks], { [i]: {...e.drinks[i], percentage: e.drinks[i].percentage + 5 }})}
        if (direction === 'down')
            return { ...e, drinks: Object.assign([...e.drinks], { [i]: {...e.drinks[i], percentage: e.drinks[i].percentage - 5 }})}
        return e;
    })

//     const buttonParentClasses = theButton.parentNode.parentNode.className.split(/\s+/)
//     const drink = buttonParentClasses[buttonParentClasses.length - 1]
//     const buttonState = theButton.className.split(/\s+/)
//     const state = buttonState[buttonState.length - 1]

//     var status
//     var e
//     var diff
//     var percentageSum = 0

//     await fetchLoad()
//     for (var i = 0; i < configData.drinks.length; ++i) {
//         if (drink == configData.drinks[i].class) {
//             if (state == 'percent-up'){
//                 e = i
//                 diff = 5
//                 status = 'ok'
//             } else if (state == 'percent-down') {
//                 e = i
//                 diff = -5
//                 status = 'ok'
//             } else {
//                 errorMessage('Button state (class) not valid... Please Check!')
//             }
//         }
//     }
//     if (status == 'ok') {
//         newConfigData.drinks[e].percentage = configData.drinks[e].percentage + diff
//         for (var i = 0; i < newConfigData.drinks.length; ++i) {
//             percentageSum = percentageSum + newConfigData.drinks[i].percentage
//         }
//         if (newConfigData.drinks[e].percentage < 0) {
//             errorMessage('negative number not allowed')
//             return displayErrorMessage('Weniger als 0% geht nicht! ;)')
//         } else if (percentageSum > 100) {
//             errorMessage('over 100%')
//             return displayErrorMessage('Alles zusammen ist mehr als 100%!')
//         } else {
//             await fetchSave()
//             const contentItem = document.getElementById(configData.ids[e])
//             contentItem.getElementsByClassName('percentage')[0].innerText = configData.drinks[e].percentage + '%'
//             var transformWaveMax
//             var transformWaveMin
//             var transformWave
//             var transformBrandMax
//             var transformBrandMin
//             var transformBrand
//             transformWaveMax = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-max'))
//             transformWaveMin = Number(getComputedStyle(content).getPropertyValue('--transform-wave-trans-min'))
//             transformWave = Math.round((configData.drinks[e].percentage/100) * (transformWaveMax - transformWaveMin) + transformWaveMin)
//             contentItem.style.setProperty('--transform-wave-trans', transformWave + "%")
//             transformBrandMax = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-max'))
//             transformBrandMin = Number(getComputedStyle(content).getPropertyValue('--transform-brand-name-min'))
//             transformBrand = Math.round(((1-configData.drinks[e].percentage/100) * (transformBrandMax - transformBrandMin) + transformBrandMin))
//             contentItem.style.setProperty('--transform-brand-name', transformBrand + "%")
//             console.log(`[All done! ${drink} has ${state}ed and saved]`)
//         }
//     } else {
//         errorMessage('Button drink-name (class) not valid... Please Check!')
//     }
}