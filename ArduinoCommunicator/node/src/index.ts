import SerialPort from 'serialport';
import readline from 'readline';
import colors from 'colors';
colors.enable();

const Readline = SerialPort.parsers.Readline; // make instance of Readline parser
const parser = new Readline({ delimiter: '\r\n' }); // make a new parser to read ASCII lines

const prompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

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
    port.on('open', () => {
        console.log('[Info] '.cyan + 'Port open with baud rate: ' + port.baudRate);
    });

    // Open errors will be emitted as an error event
    port.on('error', function(err) {
        console.log('Error: ', err.message)
    })

    // Read data that is available but keep the stream in "paused mode"
    /* parser.on('readable', console.log) */
    // Switches the port into "flowing mode"
    parser.on('data', data => {
        console.log('[Serial] '.gray + data)
        if (data !== 'Input A Command.')
            return;
        promptCommand(port);
    })

}

function promptCommand(port: SerialPort) {
    console.log('[Prompt] '.green + 'What command do you want to send? ')
    prompt.question('[Prompt] '.green + 'Command: ', command => {
        portWrite(port, command);
        // prompt.close();
    })
}

function portWrite(port: SerialPort, command: string) {
    port.write(command, (err) => {
        if (err)
            return console.log('Error on write: ', err.message);
        console.log('[System] '.cyan + 'Message `' + command + '` written')
    })
}

main();