import React from "react";
import {post} from "superagent";

function coerceParams(params) {
  function coerce(opts, param) {
    if (param.key === "") {
      return opts;
    }

    if (param.type === "boolean") {
      param.value = !!~["true", "t"].indexOf(param.value.toLowerCase());
    }

    if (param.type === "number") {
      param.value = +param.value;
    }

    opts[param.key] = param.value;
  }

  return params.reduce(coerce, {});
}

function generateOptions(arr) {
  return arr.map((val) => <option key={val} value={val}> {val} </option>);
}

export default React.createClass({
  getInitialState() {
    return {
      command: this.props.commands[0],
      params: [ { key: "", value: "", type: "string" } ],
      results: []
    };
  },

  componentWillReceiveProps(nextProps) {
    let command = this.state.command,
        params = this.state.params,
        results = this.state.results;

    if (this.props.endpoint !== nextProps.endpoint) {
      command = nextProps.commands[0];
      params = [ { key: "", value: "", type: "string" } ];
      results = [];
    }

    this.setState({ command, params, results });
  },

  chooseCommand(event) {
    return this.setState({ command: event.target.value });
  },

  addParam() {
    let params = this.state.params;
    params.push({ key: "", value: "", type: "string" });
    this.setState({ params: params });
  },

  updateParam(idx, prop) {
    return (e) => {
      let params = this.state.params;
      params[idx][prop] = e.target.value;
      this.setState({ params: params });
    };
  },

  removeParam(idx) {
    return () => {
      let params = this.state.params;

      if (params.length > 1) {
        params.splice(idx, 1);
        this.setState({ params: params });
      }
    };
  },

  runCommand() {
    let command = this.state.command,
        url = `${this.props.endpoint}/commands/${encodeURIComponent(command)}`,
        params = coerceParams(this.state.params);

    post(url)
      .send(params)
      .end((err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        let results = this.state.results,
            body = res.body;

        if (body.result != null) {
          results.unshift(body.result);

          if (results.length > 5) {
            results.pop();
          }

          this.setState({ results: results });
        }
      });
  },

  params() {
    return this.state.params.map((param, idx) => {
      let length = this.state.params.length,
          isLast = (idx + 1) === length;

      let add = isLast && this.addParam,
          remove = this.removeParam(idx);

      let update = {
        key: this.updateParam(idx, "key"),
        value: this.updateParam(idx, "value"),
        type: this.updateParam(idx, "type")
      };

      let removeButton = null;

      if (!isLast) {
        removeButton = <span className="close" onClick={remove}>&#x2716;</span>;
      }

      return (
        <div key={idx} className="input">
          <input placeholder="key"
                 onChange={update.key}
                 onFocus={add}
                 value={param.key} />

          <input placeholder="value"
                 onChange={update.value}
                 onFocus={add}
                 value={param.value} />

          <select onChange={update.type} value={param.type}>
            {generateOptions(["string", "boolean", "number"])}
          </select>
            {removeButton}
        </div>
      );
    });
  },

  results() {
    return this.state.results.map((res, idx) => (
      <div key={idx}>
        <code>{res}</code>
      </div>
    ));
  },

  render() {
    let name = this.props.name || "Commands";

    let params = this.params(),
        results = this.results();

    return (
      <div className="command-tool">
        <h2>{name}</h2>

        <div className="form">
          <select className="command-state"
                  value={this.state.command}
                  onChange={this.chooseCommand}>
            {generateOptions(this.props.commands)}
          </select>

          <div className="params">
            {params}
          </div>

          <button className="btn btn-run" onClick={this.runCommand}>
            Run
          </button>
        </div>

        <div className="results">
          {results}
        </div>
      </div>
    );
  }
});
