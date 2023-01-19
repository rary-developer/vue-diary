function saveUserNoToCookie(userData) {  
  document.cookie = `userNo=${userData.userNo}`;
}

function saveUserIdToCookie(userData){
  document.cookie = `userId=${userData.userId}`;
}

function getUserNoFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)userNo\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserIdFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(str , str2) {  
  document.cookie = `${str}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  document.cookie = `${str2}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {  
  saveUserNoToCookie,  
  saveUserIdToCookie,
  getUserNoFromCookie,
  getUserIdFromCookie,
  deleteCookie,
};
