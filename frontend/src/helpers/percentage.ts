import { configType } from "../interfaces"

function percentage(config: configType) {
    return config.drinks.reduce((partialSum, {percentage}) => partialSum + percentage, 0)
}

export default percentage