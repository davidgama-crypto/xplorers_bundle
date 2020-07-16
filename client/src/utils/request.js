import _ from 'lodash'

/**
 * Wrap fetch API by adding headers
 * multipart is required due to:
 * https://muffinman.io/uploading-files-using-fetch-multipart-form-data/
 */
const request = async (url, options) => {
    const fetchOptions = _.merge(
        {
            headers: {

                'Content-Type': 'application/json',
                //'x-application-token': JSON.parse(localStorage.getItem('token')),
                'Authorization':  JSON.parse(localStorage.getItem('token'))
            },
        },
        options
    );

    return fetch(url, fetchOptions)
        .then(async response => {
            const body = await response.json();
         if (response.ok) {
                return body
            } else {
                // eslint-disable-next-line
                throw { status: response.status, ...body }
            }
    })
}

export default request
