#!/usr/bin/env node

require('globalog')
const fs = require('fs')
const inputFile = process.argv[2]

if (!inputFile) {
  error('Please provide the SRT file name and path (if needed)... exiting')
  process.exit(1)
}
const outputFile = process.argv[3] || inputFile.replace('.srt', '.html')
const htmlize = (str) => {
  return `<p>${str}</p>`
}
fs.writeFileSync(outputFile, 
  htmlize(fs.readFileSync(inputFile, 'utf8')
    .split('\n')
    // .filter((line, index)=>(index%5 == 2 || index%5 ==3) ? true: false)
    .filter((line, index)=>(!/^\d+\n/.test(line) && !line.includes('-->')) ? true: false)
    .map((line)=>line.replace(/(\r\n|\n|\r)/gm,""))    
  .join(' '))
)
info('All is done. Used 3 char and --> to filter non text.')