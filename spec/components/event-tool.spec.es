// jshint expr:true

"use strict";

const EventTool = source("components/event-tool.es");

function render(props = {}) {
  return TestUtils.renderIntoDocument(
    <EventTool {...props} />
  );
}

function searchComponentForTag(component) {
  return function(tag) {
    return TestUtils.findRenderedDOMComponentWithTag(component, tag);
  };
}

describe("EventTool", () => {
  let component, search, MockEventSource;

  before(() => {
    component = render({ endpoint: "/api/endpoint" });
    search = searchComponentForTag(component);
  });

  beforeEach(() => {
    component.state = component.getInitialState();
    global.EventSource = MockEventSource = spy();
  });

  afterEach(() => {
    delete global.EventSource;
  });

  it("is a React component", () => {
    expect(TestUtils.isElement(<EventTool />)).to.be.eql(true);
  });

  it("has a default state", () => {
    expect(component.state).to.be.eql({
      name: "",
      listeners: {},
      events: []
    });
  });

  it("renders an input + button for listening to events", () => {
    // these will explode if they don't match, so works as a test
    search("input");
    search("button");
  });

  it("updates state.name when the input is edited", () => {
    let input = search("input");

    TestUtils.Simulate.change(input, { target: { value: "new-event"} } );
    expect(component.state.name).to.be.eql("new-event");
  });

  describe("when the button is clicked", () => {
    context("if there is input", () => {
      beforeEach(() => {
        let button = search("button");
        component.state.name = "new-event";
        TestUtils.Simulate.click(button);
      });

      it("sets up an EventSource to listen when the button is clicked", () => {
        let url = "/api/endpoint/events/new-event",
            es = component.state.listeners["new-event"];

        expect(MockEventSource).to.be.calledWith(url);
        expect(es.onmessage).to.be.a("function");
      });

      it("resets state.name to empty string when the button is clicked", () => {
        expect(component.state.name).to.be.eql("");
      });

      it("appends to state.events when it receives a message", () => {
        let es = component.state.listeners["new-event"];
        es.onmessage.call(null, { data: "new message"});
        expect(component.state.events).to.be.eql([
          { name: "new-event", data: "new message" }
        ]);
      });
    });

    context("if there is not input", () => {
      beforeEach(() => {
        let button = search("button");
        component.state.name = "";
        TestUtils.Simulate.click(button);
      });

      it("does not set up an EventSource", () => {
        expect(MockEventSource).to.not.be.called;
        expect(component.state.listeners).to.be.eql({});
      });

      it("does not modify state.name", () => {
        expect(component.state.name).to.be.eql("");
      });
    });
  });
});
