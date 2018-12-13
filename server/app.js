'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')

const app = express()
app.use(bodyParser.text())
const port = 80

const statusFile = 'status.txt'
const dataFile = 'data.csv'
const alexFile = 'alex.txt'

app.get('/', (req, res) => res.send('Hello fuckers.'))

app.post('/airsense/data', (req, res) => {
	let line = req.body
	line = new Date().toISOString() + ', ' + line + '\n'
	fs.appendFile(dataFile, line, function (err) {
	  if (err) res.sendStatus(500)
	  else res.sendStatus(200)
	})
})

app.get('/airsense/data', (req, res) => {
	fs.readFile(dataFile, function (err, data) {
	  if (err) res.sendStatus(500)
	  else res.type('text/plain').send(data)
	})
})

app.post('/airsense/status', (req, res) => {
	let line = req.body
	line = new Date().toISOString() + ', ' + line + '\n'
	fs.appendFile(statusFile, line, function (err) {
	  if (err) res.sendStatus(500)
	  else res.sendStatus(200)
	})
})

app.get('/airsense/status', (req, res) => {
	fs.readFile(statusFile, function (err, data) {
	  if (err) res.sendStatus(500)
	  else res.type('text/plain').send(data)
	})
})

app.post('/alex/data', (req, res) => {
	let line = req.body
	line = new Date().toISOString() + ', ' + line + '\n'
	fs.appendFile(alexFile, line, function (err) {
	  if (err) res.sendStatus(500)
	  else res.sendStatus(200)
	})
})

app.get('/alex/data', (req, res) => {
	fs.readFile(alexFile, function (err, data) {
	  if (err) res.sendStatus(500)
	  else res.type('text/plain').send(data)
	})
})

app.listen(port, () => console.log(`Airsense server listening on port ${port}!`))