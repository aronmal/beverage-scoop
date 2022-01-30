export type drinkType = {
    drinkname: string,
    class: string,
    level: number,
    percentage: number,
}

export type configType = {
    drinks: drinkType[],
    templates: drinkType[],
}