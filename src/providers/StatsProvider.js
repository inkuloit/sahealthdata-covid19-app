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

class StatsProvider {
  static async get(type, id, query = '') {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      url: `${config.api.baseurl}stats/${type}/${id}?${query}`,
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }
}

export default StatsProvider;
