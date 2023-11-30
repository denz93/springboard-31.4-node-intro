import fs from 'fs'

export default async function cat(path) {
  return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
}