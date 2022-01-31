export type drinkType = {
    drinkUuid: string,
    drinkname: string,
    type: string,
    level: number,
    percentage: number,
}

export type configType = {
    drinks: drinkType[],
    templates: drinkType[],
}

export type bubbleType = {
    bubbleUuid: string,
    size: string,
    left: string,
    animation1: string,
    animationFillMode: string,
    animation2: string,
}

export type bubblesType = {
    drinkUuid: string,
    bubbles: bubbleType[]
}