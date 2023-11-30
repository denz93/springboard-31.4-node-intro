import axios from 'axios'

export default async function webCat(path) {
  try {
    const res = await axios.get(path)
    return res.data
  } catch (err) {
    console.log(`Error fetching ${path}:`)
    if (err.response) {
      console.log(`Error request failed with status code ${err.response.status}`)
      console.error(err.response.data)
    } else if (err.request) {
      console.log(err.request)
    } else {
      console.log(err.message)
    }
  }
 
}