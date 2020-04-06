export default {
    stage: process.ENV ? process.ENV : 'dev',
    project: {
        id: '2d3afb76-d17e-4042-8b06-8afe0e1138a4',
        company: 'e61d9d19-607c-4b50-bacf-37a3416083b3',
    },
    api: {
        baseurl: 'http://localhost:8080/',
        // baseurl: 'https://sahealthdata-api.herokuapp.com/',
    },
    geoip: {
        url: 'https://geolocation-db.com/json',
    },
};
