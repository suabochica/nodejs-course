/*
const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is sergio')
fs.appendFileSync('notes.txt', ' I live in Bogotá')
*/
const validator = require('validator')
const chalk = require('chalk')

const getNotes = require('./notes.js')

const msg = getNotes()
const greenMsg = chalk.green.inverse.bold(msg);

console.log(greenMsg)
console.log(validator.isURL('https/mead.io'))