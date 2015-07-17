import React from "react";

export default React.createClass({
  render() {
    let root = location.origin + "/api/",
        path = this.props.path;

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

    return (
      <div className="cppp-io-details">
        <table>
          <tr className="path">
            <td className="key">CPPP-IO Path</td>
            <td onClick={select} className="value">
              <div> { path } </div>
            </td>
          </tr>

          <tr className="curl">
            <td className="key">cURL</td>
            <td onClick={select} className="value">
              <div> { `curl ${root + path}` } </div>
            </td>
          </tr>
        </table>
      </div>
    );
  }
});
