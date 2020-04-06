import axios from 'axios';
import config from '../config';

class GeoLocationProvider {
    static async getClientLocation() {
        return await axios({
            mode: 'no-cors',
            method: 'GET',
            url: config.geoip.url,
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err;
        })
    }
}

export default GeoLocationProvider;
