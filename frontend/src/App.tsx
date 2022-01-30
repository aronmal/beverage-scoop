function App() {

  const wasd: any[] = []

  return (
    <div className="flex-col">
        <div id="header-bar" className="flex-row">
            <p id="time">00:00</p>
            <div id="header-right" className="flex-row">
              {wasd.map(() => (
                <div className="flex-row drink-level">
                <div className="drink-div flex-col">
                    <p className="level-percent"></p>
                    <div className="wave-trans">
                        <div className="wave-rot">
                            <div className="wave-color"></div>
                        </div>
                    </div>
                </div>
                <p className="drink-name"></p>
                </div>
              ))}
            </div>
        </div>
        <div id="content" className="flex-col">
            <p id="message"></p>
            <div id="content-div" className="flex-row">
              {wasd.map(() => (
                <div className="flex-row content-drink">
                    <div className="drink-div flex-col">
                        <p className="brand-name drink-name"></p>
                        <div className="wave-trans">
                            <div className="wave-rot">
                                <div className="wave-color"></div>
                            </div>
                        </div>
                    </div>
                    <div className="value grid-3-col">
                        <button className="percent-up"><span>&lt;</span></button>
                        <p className="percentage"></p>
                        <button className="percent-down"><span>&gt;</span></button>
                    </div>
                </div>
              ))}
            </div>
        </div>
    </div>
  );
}

export default App;
