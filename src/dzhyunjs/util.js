export function unParam(searchStr) {
  return (searchStr.indexOf('?') === 0 ? searchStr.substring(1) : searchStr)
    .split('&')
    .reduce((result, pair) => {
      if (pair !== '') {
        const arr = pair.split('=');
        result[decodeURIComponent(arr[0])] = decodeURIComponent(
          arr.slice(1).join('=')
        );
      }
      return result;
    }, {});
}
