"use strict";

const EventTool = source("components/event-tool.es");

function render(props = {}) {
  return TestUtils.renderIntoDocument(
    <EventTool {...props} />
  );
};

describe("EventTool", () => {
  let component;

  beforeEach(() => {
    component = render({
      commands: [ "commandA", "commandB", "commandC" ],
      endpoint: "/api/endpoint"
    });
  });

  it("is a React Class", () => {
    expect(EventTool).to.be.a("function");
  });

  it("has a default state", () => {
    expect(component.state).to.be.eql({
      name: "",
      listeners: {},
      events: []
    })
  })

  it("renders an input + button for listening to events", () => {
    // these will explode if they don't match
    TestUtils.findRenderedDOMComponentWithTag(component, 'input'),
    TestUtils.findRenderedDOMComponentWithTag(component, 'button');
  });
});
