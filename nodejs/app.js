
const cors = require('cors');
const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs')

var configFileData
var newConfigFileData

// Start listening on port 5000
app.listen(5000, () => console.log('Server running on: http://localhost:5000'))
app.use(express.static('public'))
app.use(express.json())
app.use(cors());

app.get('/api/get', (req,res) => {
    readConfig()
    res.send(JSON.parse(configFileData))
    console.log('[GET request served]')
})
app.post('/api/post', (req,res) => {
    readConfig()
    newConfigFileData = req.body
    console.log(req.body)
    console.log('[POST request received]')
    saveConfig()
    res.json({
        status: 'success',
        message: 'received'
    })
})




async function readConfig() {
    try {
        configFileData = fs.readFileSync('config.json', 'utf8')
      } catch (err) {
        console.error(err)
      }
}

// if new configuration, write to file
function saveConfig() {
    if ((configFileData !== newConfigFileData) && (newConfigFileData !== undefined))  {
        try {
            fs.writeFileSync('config.json', JSON.stringify(newConfigFileData))
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