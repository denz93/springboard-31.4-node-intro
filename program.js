import process from 'process'
import cat from './cat.js'
import webCat from './webCat.js'
import fs, { WriteStream } from 'fs'
import { Writable } from 'stream'
/**
 * 
 * @param {string[]} argv 
 */
function parseArguments(argv) {
  const strippedArgv = argv.slice(2)
  const OUTPUT_SIGNATURES = ['--output', '--out']
  let inputs = []
  let output = null

  for (let i = 0; i < strippedArgv.length; i++) {
    const arg = strippedArgv[i]
    if (OUTPUT_SIGNATURES.includes(arg)) {
      output = strippedArgv[i + 1]
      i++
    } else {
      inputs.push(arg)
    }
  }
  
  return {
    inputs,
    output
  }
}
function isUrl(path) {
  return path.startsWith('http://') || path.startsWith('https://')
}

async function main() {
  const { inputs, output } = parseArguments(process.argv)
  
  /**
   * @type {Writable}
   */
  let stream = null
  if (output) {
    stream = fs.createWriteStream(output,{encoding:'utf-8', flags:'w'})
  } else {
    stream = process.stdout
  }

  for (let input of inputs) {
    let content = ''
    if (isUrl(input)) {
      content = await webCat(input)
      
    } else {
      content = await cat(input)
    }
    write(content, stream)
  }

  stream.end()
}

/**
 * 
 * @param {string} content 
 * @param {Writable} stream 
 */
function write(content, stream) {
  stream.write(content)
}

main()