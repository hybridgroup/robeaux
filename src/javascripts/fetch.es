import {get} from "superagent";

export default function fetch(endpoint, callback) {
  if (typeof endpoint === "function") {
    callback = endpoint;
    endpoint = "/api";
  }

  get(endpoint, (err, res) => {
    if (err) { return callback(err); }
    let json = JSON.parse(res.text);
    callback(null, json);
  });
}
