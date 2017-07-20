import axios from 'axios'
import qs from 'qs'
const config= {
	 headers:{'Content-Type':'multipart/form-data'}
}
const fetch = ({url, body, type, header }) => {
  if (type === 'POST') {
    return axios.post(url, qs.stringify(body),header)
  } else {
    return axios.get(url, {params: body})
  }
}

export default fetch
