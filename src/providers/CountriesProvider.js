import axios from 'axios';
import config from '../config';
import { Session } from 'bc-react-session';

const session = Session.getSession();
let headers = {};

if (session.isValid) {
  headers = {
    'Authorization': `Bearer ${session.payload.token}`,
    'Content-Type': 'application/json',
  }
}

class CountriesProvider {
  static async get(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      url: `${config.api.baseurl}countries/${id}`,
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }

  static async getAll() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      url: `${config.api.baseurl}countries`,
      crossdomain: true,
      headers,
    })
    .then((res) => {
      return res.data.results;
    });
  }

  static async getProvinces(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      url: `${config.api.baseurl}countries/${id}/provinces`,
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data.results;
    });
  }
}

export default CountriesProvider;
