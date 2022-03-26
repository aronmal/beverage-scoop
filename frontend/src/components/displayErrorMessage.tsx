function displayErrorMessage(setElem: React.Dispatch<React.SetStateAction<JSX.Element>>, errorMessage: string) {
    setElem(<p id="message" style={{ animation: 'error-message 2s' }}>{ errorMessage }</p>)
    setTimeout (() => {
      setElem(<></>)
    }, 2000)
}

export default displayErrorMessage;