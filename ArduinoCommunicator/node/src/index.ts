import SerialPort from 'serialport';

const Readline = SerialPort.parsers.Readline; // make instance of Readline parser
const parser = new Readline({ delimiter: '\r\n' }); // make a new parser to read ASCII lines

const userInput = "A"

const main = async () => {

    // list serial ports:
    const ports = await SerialPort.list().then(ports => ports.filter(port => port.manufacturer));

    if (ports.length !== 1)
        return;
    const port = new SerialPort(ports[0].path, {
        baudRate: 9600,
    });

    // Read Line Parser
    port.pipe(parser); // pipe the serial stream to the parser

    // Handling Events
    port.on('open', showPortOpen);
    // Callback Functions
    function showPortOpen() {
        console.log('Port open. baudRate: ' + port.baudRate);
    }

    // Open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message)
    })

    // Read data that is available but keep the stream in "paused mode"
    // parser.on('readable', function () {
    //     console.log('Data:', port.read())
    // })
    // Switches the port into "flowing mode"
    parser.on('data', console.log)


    setTimeout(() => {
        port.write(userInput, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message)
            }
            console.log('message written')
        })
    }, 1000)
}

main();