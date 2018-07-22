function getUrlParameters() {
  const pairs = window.location.search.substring(1).split(/[&?]/);
  const res = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split("=");
    if (pair[1])
      res[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return res;
}

function niceNumber(x) {
  if ((typeof(x) === "number") && !isNaN(x)) {
    const parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts[0];
  } else
    return x;
}

export { getUrlParameters, niceNumber };
