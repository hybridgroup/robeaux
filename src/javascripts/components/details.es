import React from "react";

function generateRow(opts) {
  return (
    <tr className={ opts.klass }>
      <td className="key">{ opts.key }</td>
      <td onClick={select} className="value">
        <div> { opts.value } </div>
      </td>
    </tr>
  );
}

function select(e) {
  if (document.selection) {
    var range = document.body.createTextRange();
    range.moveToElementText(e.target);
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(e.target);
    window.getSelection().addRange(range);
  }
}

export default React.createClass({
  render() {
    let root = location.origin + "/api/",
        path = this.props.path,
        obj = this.props.json;

    let rows = [
      { klass: "path", key: "CPPP-IO Path", value: path },
      { klass: "curl", key: "cURL", value: `curl ${root + path}` },
      { klass: "commands", key: "Commands", value: obj.commands.join(", ") },
      { klass: "events", key: "Events", value: obj.events.join(", ") },
    ];

    return (
      <div className="cppp-io-details">
        <table> { rows.map(generateRow) } </table>
      </div>
    );
  }
});
