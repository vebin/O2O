import axios from 'axios'
import qs from 'qs'
const fetch = ({url, body, type}) => {
  if (type === 'POST') {
    return axios.post(url, qs.stringify(body))
  } else {
    return axios.get(url, {params: body})
  }
}
export default fetch
