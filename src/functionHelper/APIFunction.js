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

export { GET, POST, DELETE, POST1};
