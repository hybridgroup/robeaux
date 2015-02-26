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
      let events = this.state.events;
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
    let listeners = Object.keys(this.state.listeners).map((name) => {
      return (
        <tr key={name} className="listener">
          <td>{name}</td>

          <td className="remove" onClick={this.removeListener(name)}>
            remove
          </td>
        </tr>
      );
    });

    return (
      <table className="listeners">
        <thead>
          <th colSpan="2">Listeners</th>
        </thead>

        <tbody>
          { listeners }
        </tbody>
      </table>
    );
  },

  events: function() {
    let events = this.state.events.map((event, idx) => {
      return (
        <tr key={idx} className="event">
          <td>{event.name}</td>
          <td>{event.data}</td>
        </tr>
      );
    });

    return (
      <table className="events">
        <thead>
          <th colSpan="2">Events</th>
        </thead>

        <tbody>
          { events }
        </tbody>
      </table>
    );
  },

  render: function() {
    let listeners = this.listeners(),
        events = this.events();

    return (
      <div className="event-tool">
        <h1>Events</h1>

        <div className="input">
          <input placeholder="event"
                 value={this.state.name}
                 onChange={this.updateName} />

          <button onClick={this.listen}> Listen </button>
        </div>

        { listeners }

        { events }
      </div>
    );
  }
});
