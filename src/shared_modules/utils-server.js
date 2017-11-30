function fetchContent(url, options) {
    return window.fetch(url, options).then(response => {
        if (response.ok)
            return response;
        else
            throw new Error(response.statusText);
    });
}

function encodeQueryData(data) {
    return Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
}

function getJson(url, data, options) {
    if (data)
        url += ((url.indexOf('?') === -1) ? "?" : "&") + encodeQueryData(data);
    return fetchContent(url, options).then(content => content.json());
}

const cache = {};

function getJsonWithCache(...args) {
    const key = JSON.stringify(args);
    if (cache[key])
        return Promise.resolve(cache[key]);
    else
        return getJson(...args).then(value => {
            cache[key] = value;
            return value;
        });
}

export {getJson, getJsonWithCache};
