/* eslint no-unused-vars:0 */

"use strict";

const CommandTool = source("components/command-tool.es");

function render(props = {}) {
  return TestUtils.renderIntoDocument(
    <CommandTool {...props} />
  );
}

describe("CommandTool", () => {
  let component;

  before(() => {
    component = render({
      commands: [ "commandA", "commandB", "commandC" ],
      endpoint: "/api/endpoint"
    });
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
