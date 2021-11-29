
const cors = require('cors');
const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs')

var configFileData
var newConfigFileData

// Start listening on port 5000
app.listen(5000, () => console.log('Server running on: http://localhost:5000'))
// app.use(express.static('public'))
app.use(express.json())
app.use(cors());

// NGINX Replacement
app.get('/', (req,res) => {res.sendFile(path.join(__dirname, 'src/index.html'))})
app.get('/index.html', (req,res) => {res.sendFile(path.join(__dirname, 'src/index.html'))})
app.get('/favicon.ico', (req,res) => {res.sendFile(path.join(__dirname, 'src/favicon.ico'))})
app.get('/index.js', (req,res) => {res.sendFile(path.join(__dirname, 'src/index.js'))})
app.get('/style.css', (req,res) => {res.sendFile(path.join(__dirname, 'src/style.css'))})

// GET 'Hello World!'
app.get('/api/hello', (req,res) => res.send('Hello World!'))
app.get('/api/test', (req,res) => {
    test()
    res.send(JSON.parse(configFileData))
})
app.post('/api/post', (req,res) => {
    console.log(req.body)
    res.json({
        status: 'success',
        message: 'received'
    })
})

console.log('Test running on: http://localhost:5000/test')



function readConfig() {
    try {
        configFileData = fs.readFileSync('test.json', 'utf8')
        console.log('Data read')
      } catch (err) {
        console.error(err)
      }
}

function printConfigData() {
    console.log(configFileData.length)

    // print all data
    var percent = 0
    configFileData.forEach(data => {
        percent = percent + data.percentage;
        console.log(percent)
    });

    if (percent == 100) {
        console.log('100% reached!')
    } else {
        console.log('Somthing went wrong, "percent" is ' + percent + '% and not 100%')
    }
}


function editConfig() {
    newConfigFileData = JSON.parse(configFileData)
    if (newConfigFileData.length == 4) {
        newConfigFileData[newConfigFileData.length] = newConfigFileData[newConfigFileData.length-1]
    } else {
        newConfigFileData.pop()
    }
}

// if new configuration, write to file
function saveConfig() {
    if ((configFileData !== newConfigFileData) && (newConfigFileData !== undefined))  {
        try {
            fs.writeFileSync('test.json', JSON.stringify(newConfigFileData))
            //file written successfully
            console.log('Data written')
        } catch (err) {
            //error message
            console.error(err)
        }
    } else if (configFileData !== newConfigFileData) {
        console.log('No writing action, new config and config file are the same.')
    } else if (newConfigFileData == undefined) {
        console.log('No writing action, new config is undefined')
    } else {
        console.log('New config not saved, an unknown error accured!')
    }
}

function test() {
    readConfig()
    // editConfig()
    saveConfig()
    readConfig()
}