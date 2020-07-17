import _ from 'lodash'

const request = async (url, options) => {
    const fetchOptions = _.merge(
        {
            headers: {

                'Content-Type': 'application/json',
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
