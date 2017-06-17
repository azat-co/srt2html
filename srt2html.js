const fs = require('fs')
const inputFile = process.argv[2]
const outputFile = process.argv[3] || inputFile.replace('.srt', '.html')

const htmlize = (str) => {
  return `<p>${str}</p>`
}
fs.writeFileSync(outputFile, 
  htmlize(fs.readFileSync(inputFile, 'utf8')
    .split('\n')
    // .filter((line, index)=>(index%5 == 2 || index%5 ==3) ? true: false)
    .filter((line, index)=>(line.length>3 && !line.includes('-->')) ? true: false)
    .map((line)=>line.replace(/(\r\n|\n|\r)/gm,""))    
  .join(' '))
)