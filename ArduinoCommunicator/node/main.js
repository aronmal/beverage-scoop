const serialport = require('serialport')
// FIXME THIS LANGUAGE IS THE FUCKING SPAWN OF SATAN HIMSELF
var Readline = serialport.parsers.Readline; // make instance of Readline parser
// var parser = new Readline(); // make a new parser to read ASCII lines

const parser = new Readline()

const userInput = "A"

// const port = new serialPort('/dev/ttyACM0')


// list serial ports:
// serialport.list(function (err, ports) {
//     ports.forEach(function (port) {
//         console.log("Serial Device: " + port.comName);
//     });
// });

// get port name from the command line:
//var path = '/dev/cu.SLAB_USBtoUART' ;
var path = '/dev/ttyACM0';

var port = new serialport(path ,{
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