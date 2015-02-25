import React from "react";

export default React.createClass({
  getInitialState: function() {
    return { name: "", listeners: {}, events: [] };
  },

  updateName: function(e) {
    this.setState({ name: e.target.value });
  },

  listen: function() {
    let event = this.state.name,
        listeners = this.state.listeners,
        url = `${this.props.endpoint}/events/${event}`;

    if (event === "") {
      return;
    }

    let source = new EventSource(url);

    source.onmessage = (msg) => {
      var events = this.state.events;
      events.unshift({ name: event, data: msg.data });
      if (events.length > 5) { events.pop(); }
      this.setState({ events: events });
    };

    listeners[event] = source;

    this.setState({
      name: "",
      listeners: listeners
    });
  },

  removeListener: function(name) {
    return () => {
      let listeners = this.state.listeners;
      listeners[name].close();
      delete listeners[name];
      this.setState({ listeners: listeners });
    };
  },

  listeners: function() {
    return Object.keys(this.state.listeners).map((name) => {
      return (
        <tr key={name} className="listener">
          <td>{name}</td>
          <td className="remove" onClick={this.removeListener(name)}>remove</td>
        </tr>
      );
    });
  },

  events: function() {
    return this.state.events.map((event, idx) => {
      return (
        <tr key={idx} className="event">
          <td>{event.name}</td>
          <td>{event.data}</td>
        </tr>
      );
    });
  },

  render: function() {
    return (
      <div className="event-tool">
        <h1>Events</h1>

        <div className="input">
          <input placeholder="event"
                 type="text"
                 value={this.state.name}
                 onChange={this.updateName} />

          <button onClick={this.listen}> Listen </button>
        </div>

        <table className="listeners">
          <thead>
            <th colSpan="2">Listeners</th>
          </thead>

          <tbody>
            { this.listeners() }
          </tbody>
        </table>

        <table className="events">
          <thead>
            <th colSpan="2">Events</th>
          </thead>

          <tbody>
            { this.events() }
          </tbody>
        </table>
      </div>
    );
  }
});
