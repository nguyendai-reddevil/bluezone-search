import axios from 'axios';

const baseHost = 'http://14.248.94.94:9200'
const AppConfig = {
    axios: {
        baseURL: `${baseHost}`,
        // baseURL: `${baseCommon}`,
        responseType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000,
      },
}
const client = axios.create(AppConfig.axios);

const myClient = {
  post(endpoint, mParams, config) {
    return client.post(endpoint, mParams, config)
  },
  put(endpoint, mParams, config) {
    return client.put(endpoint, mParams, config);
  },
  get(endpoint, config) {
    return client.get(endpoint, config);
  },
  delete(endpoint, config) {
    return client.delete(endpoint, config);
  },
};

const ApiSearch = {
    searchKeyword: (params) => {
        return myClient.get(`/medicalsearch?key_search=${params}`,
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
          )
      },
}
export default ApiSearch
