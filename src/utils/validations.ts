export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

export function validateIgUrl(url: string) {
  var p = /^(https?:\/\/){0,1}(www\.){0,1}instagram\.com/;
  if (url.match(p)) {
    return true;
  } else {
    return false;
  }
}

export function validateFbUrl(url: string) {
  var p2 =
    /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i;
  if (url.match(p2)) {
    return true;
  } else {
    return false;
  }
}

export function isDecimal(value: number): boolean {
  return value % 1 != 0
}