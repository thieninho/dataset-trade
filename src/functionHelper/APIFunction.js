import $ from "jquery";
import { getCookie } from "./GetSetCookie";
const GET = async (_url) => {
  let res = await $.get({
    url: _url,
    dataType: "json",
    headers: {
      Authorization: "Token " + getCookie("token"),
    },
    contentType: "application/json",
  });
  return res;
};

const POST = async (_url, _body) => {
  let res = await $.ajax({
    type: "POST",
    url: _url,
    data: _body,
    dataType: "json",
    headers: {
      Authorization: "Token " + getCookie("token"),
    },
    contentType: "application/json; charset=utf-8",
  });
  return res;
};

const DELETE = async (_url, _body) => {
  let res = await $.ajax({
    type: "DELETE",
    url: _url,
    data: _body,
    dataType: "json",
    headers: {
      Authorization: "Token " + getCookie("token"),
    },
    contentType: "application/json; charset=utf-8",
  });
  return res;
};

const POST1 = async (_url, _body) => {
  let res = await $.ajax({
        url: _url,
        type: 'POST',
        async: false,
        contentType: 'application/json',
        headers: {
            "Authorization": "Token " + getCookie("token"),
        },
        data: _body,
        dataType: 'json',
        success: function(result) {
            if (result == null || result.status == null || result.status.http_status == null) {
                alert("Something went wrong: " + JSON.stringify(result));
                return;
            }

            if (result.status.http_status !== "OK") {
                alert("Failed: " + result.status.exception_code);
                return;
            }
          }
  });
  return res;
}
class Base{
static getAllUrlParams(url) {
  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];

      // split our query string into its component parts
      var arr = queryString.split('&');

      for (var i = 0; i < arr.length; i++) {
          // separate the keys and the values
          var a = arr[i].split('=');

          // set parameter name and value (use 'true' if empty)
          var paramName = a[0];
          var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

          // (optional) keep case consistent
          // paramName = paramName.toLowerCase();
          // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

          // if the paramName ends with square brackets, e.g. colors[] or colors[2]
          if (paramName.match(/\[(\d+)?\]$/)) {

              // create key if it doesn't exist
              var key = paramName.replace(/\[(\d+)?\]/, '');
              if (!obj[key]) obj[key] = [];

              // if it's an indexed array e.g. colors[2]
              if (paramName.match(/\[\d+\]$/)) {
                  // get the index value and add the entry at the appropriate position
                  var index = /\[(\d+)\]/.exec(paramName)[1];
                  obj[key][index] = paramValue;
              } else {
                  // otherwise add the value to the end of the array
                  obj[key].push(paramValue);
              }
          } else {
              // we're dealing with a string
              if (!obj[paramName]) {
                  // if it doesn't exist, create property
                  obj[paramName] = paramValue;
              } else if (obj[paramName] && typeof obj[paramName] === 'string'){
                  // if property does exist and it's a string, convert it to an array
                  obj[paramName] = [obj[paramName]];
                  obj[paramName].push(paramValue);
              } else {
                  // otherwise add the property
                  obj[paramName].push(paramValue);
              }
          }
      }
  }

  return obj;
}
}
export { GET, POST, DELETE, POST1, Base};
