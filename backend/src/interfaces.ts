export type drinkType = {
    drinkname: string,
    type: string,
    level: number,
    percentage: number,
}

export type configType = {
    drinks: drinkType[],
    templates: drinkType[],
}