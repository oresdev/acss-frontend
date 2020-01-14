import storage from '../storage'

import axios from 'axios'

/**
 * Manage your api.
 *
 * Current implementation Api should always be accessed through this instace.
 *
 * Perform a custom Axios request.
 *
 * data is an object containing the following properties:
 *  - method
 *  - url
 *  - data ... request payload
 *  - auth (optional)
 *    - username
 *    - password
 **/

export default {
    init() {
        const headers = axios.defaults.headers.common

        headers['Content-Type'] = 'application/json'

        headers['X-USER-EMAIL'] = `${storage.get('session_data').user.email}`
        headers['X-USER-TOKEN'] = `${storage.get('session_data').user.token}`
    },

    close: () => (
        (axios.defaults.headers.common = {}), storage.remove('session_data')
    ),

    get: endpoint => axios.get(endpoint),

    post: (endpoint, data) => axios.post(endpoint, data),

    delete: endpoint => axios.delete(endpoint),
}
