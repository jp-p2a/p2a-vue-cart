require('babel-polyfill');
import {
    cloneDeep as _cloneDeep,
    isEmpty as _isEmpty
} from "lodash";
import axios from 'axios';
import * as ENDPOINTS from "@/constants/endPoints";
import * as HEADERS from "@/constants/requestsHeaders";
import MockAdapter from 'axios-mock-adapter';
//const MockAdapter = require('axios-mock-adapter');

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios);

// Mock any GET request to /users
// arguments for reply are (status, data, headers)
mock.onGet('/products').reply(200, {
    data: [

        {
            id: 1223,
            name: "Mac"
        },

        {
            id: 133,
            name: "Pixel 3"
        },

        {
            id: 948,
            name: "iPhone 10"
        },

        {
            id: 444,
            name: "Samsung 10"
        },
    ]
});

axios.defaults.responseType = 'json';

const successStatusCode = 200;

/**
 * Helper class for API calls using Axios
 */
export default class AxiosHelper {

    static getInstance(baseUrl = ENDPOINTS.BASE_ENDPOINT) {

        const axiosClone = _cloneDeep(axios);

        //AxiosHelper.setRequestAuth(axiosClone);

        const headers = AxiosHelper.getRequestHeaders(axiosClone);

        // @see https://github.com/axios/axios#request-config
        return axiosClone.create({
            headers,
            baseURL: baseUrl,
            // `transformResponse` allows changes to the response data to be made before
            // it is passed to then/catch
            transformResponse: [ data => { return AxiosHelper.transformResponse(data) }],
            validateStatus: function (status) {
                return parseInt(status, 10) === successStatusCode;
            },
        });
    }

    static setRequestAuth(axiosLib) {

    }

    static getRequestHeaders(axiosLib) {

        return {
            [HEADERS.KEY_X_REQUESTED_WITH] : HEADERS.VALUE_X_REQUESTED_WITH
        };
    }

    static transformResponse(response) {
        let json = response;

        try {
            json = JSON.parse(response);
        } catch (e) {

        }

        if (!json || _isEmpty(json.data)) {
            return json;
        }

        try {
            return JSON.parse(json.data);
        } catch (e) {
            return json.data || {};
        }
    }
}