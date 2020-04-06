import axios from 'axios';
import config from '../config';
import { Session } from 'bc-react-session';

const session = Session.getSession();
let headers = {};

if (session.isValid) {
  headers = {
    'Authorization': `Bearer ${session.payload.token}`,
  }
}

class UserProvider {
  static async profile() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${config.api.baseurl}user`,
      crossdomain: true,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }

  static async addresses() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${config.api.baseurl}user/addresses`,
      crossdomain: true,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }

  static async emails() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${config.api.baseurl}user/emails`,
      crossdomain: true,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }

  static async addEmailAddress(data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      url: `${config.api.baseurl}user/emails`,
      crossdomain: true,
      data,
    })
    .then((res) => {
      return res.data;
    });
  }

  static async deleteEmailAddress(id) {
    return await axios({
      mode: 'no-cors',
      method: 'DELETE',
      headers: headers,
      url: `${config.api.baseurl}user/emails/${id}`,
      crossdomain: true,
    })
    .then((res) => {
      return res.data;
    });
  }

  static async mobiles() {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${config.api.baseurl}user/mobiles`,
      crossdomain: true,
    })
    .then((json) => json.data)
    .then((res) => {
      return res.data;
    });
  }

  static async search(prop, value) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: headers,
      url: `${config.api.baseurl}user/search/${prop}/${value}`,
      crossdomain: true,
    })
    .then((res) => {
      return res.data;
    });
  }

  static async addMobileNumber(data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      headers: headers,
      url: `${config.api.baseurl}user/mobiles`,
      crossdomain: true,
      data,
    })
    .then((res) => {
      return res.data;
    });
  }

  static async deleteMobileNumber(id) {
    return await axios({
      mode: 'no-cors',
      method: 'DELETE',
      headers: headers,
      url: `${config.api.baseurl}user/mobiles/${id}`,
      crossdomain: true,
    })
    .then((res) => {
      return res.data;
    });
  }
}

export default UserProvider;
