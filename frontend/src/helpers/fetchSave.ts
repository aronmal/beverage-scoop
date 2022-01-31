import { configType } from "../interfaces"
import fetchLoad from "./fetchLoad"

export default async function fetchSave(setElem: React.Dispatch<React.SetStateAction<JSX.Element>>, newConfigData: configType) {
    const postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConfigData)
    }
    await fetch('/api/post', postOptions)
    .catch(error => console.log(error))
    fetchLoad(setElem)
}