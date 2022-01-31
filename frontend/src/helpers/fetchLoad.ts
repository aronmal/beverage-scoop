import displayErrorMessage from "./displayErrorMessage"
import errorMessage from "./errorMessage"

export default async function fetchLoad(setElem: React.Dispatch<React.SetStateAction<JSX.Element>>) {
    const getOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    await fetch('/api/get', getOptions)
    .then(res => res.json())
    .then(data => {
        console.log('[INFO] Received configData')
        return data
    })
    .catch(error => {console.log(error)
        errorMessage('No Connection to Backend/API')
        displayErrorMessage(setElem, 'Fehler beim abrufen der Konfiguration!')
    })
}