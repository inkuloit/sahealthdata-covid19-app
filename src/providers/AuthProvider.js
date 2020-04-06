import axios from 'axios';
import config from '../config';
import { Session } from 'bc-react-session';
import { browserName, osName, osVersion } from 'react-device-detect';

const session = Session.getSession();
let headers = {};

if (session.isValid) {
  headers = {
    'Authorization': `Bearer ${session.payload.token}`,
  }
}

class AuthProvider {
  static async login(user, password, geoLocation) {
    const device = {
      browser: browserName,
      os_name: osName,
      os_version: osVersion,
    };
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/login`,
      data: { user, password, device, geoinfo: geoLocation },
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async verifyPin(pincode) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/pin/verify`,
      data: { pincode },
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async mobileVerifyResend(mobile) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/mobile/verify/resend`,
      data: { mobile },
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async mobileVerify(token, otp) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/mobile/verify`,
      crossdomain: true,
      data: { token, otp },
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async emailVerifyResend(email) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/email/verify/resend`,
      data: { email },
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async emailVerify(key) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/email/verify`,
      crossdomain: true,
      data: { key },
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async register(data) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/register`,
      data,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async tokens(id) {
    return await axios({
      mode: 'no-cors',
      method: 'GET',
      headers: {},
      url: `${config.api.baseurl}auth/tokens`,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async changePassword(old_password, new_password1, new_password2) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/password/change`,
      data: { old_password, new_password1, new_password2 },
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async verifyPassword(password) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/password/verify`,
      data: { password },
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async logout() {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/logout`,
      crossdomain: true,
      headers,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }

  static async resetPassword(user) {
    return await axios({
      mode: 'no-cors',
      method: 'POST',
      url: `${config.api.baseurl}auth/password/reset`,
      data: { email: user, mobile: user },
      crossdomain: true,
    })
    .then((json) => json.data)
    .then((res) => {
      return res;
    });
  }
}

export default AuthProvider;
