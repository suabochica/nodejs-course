/*
const fs = require('fs')

fs.writeFileSync('notes.txt', 'My name is sergio')
fs.appendFileSync('notes.txt', ' I live in Bogotá')
*/

const getNotes = require('./notes.js')
const msg = getNotes()

console.log(msg)