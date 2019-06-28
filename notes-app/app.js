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

const command = process.argv[2]

console.log(process.argv);
console.log(greenMsg)
console.log(validator.isURL('https/mead.io'))

if (command === 'add') {
  console.log('Adding note!')
} else if (command === 'remove') {
  console.log('Removing note!')
}