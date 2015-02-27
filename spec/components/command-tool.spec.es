// jshint expr:true

"use strict";

const CommandTool = source("components/command-tool.es");

function render(props = {}) {
  return TestUtils.renderIntoDocument(
    <CommandTool {...props} />
  );
}

function searchMany(component) {
  return function(tag) {
    return TestUtils.scryRenderedDOMComponentsWithTag(component, tag);
  };
}

function searchOne(component) {
  return function(tag) {
    return TestUtils.findRenderedDOMComponentWithTag(component, tag);
  };
}

describe("CommandTool", () => {
  let component, findOne, findMany;

  before(() => {
    component = render({
      commands: [ "commandA", "commandB", "commandC" ],
      endpoint: "/api/endpoint"
    });

    findOne = searchOne(component);
    findMany = searchMany(component);
  });

  beforeEach(() => {
    component.state = component.getInitialState();
  });

  it("is a React component", () => {
    expect(TestUtils.isElement(<CommandTool />)).to.be.eql(true);
  });

  it("has a default state", () => {
    expect(component.state).to.be.eql({
      command: "commandA",
      params: [{ key: "", value: "", type: "string" }],
      results: []
    });
  });
});
