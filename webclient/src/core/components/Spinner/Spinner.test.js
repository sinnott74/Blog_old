import React from "react";
import { shallow } from "enzyme";
import Spinner from "./index";

describe("Spinner", () => {
  test("renders without crashing", () => {
    shallow(<Spinner />);
  });

  test("has a default size of 48", () => {
    const wrapper = shallow(<Spinner />);
    const svg = wrapper.find("svg");
    expect(svg.prop("width")).toBe(48);
    expect(svg.prop("height")).toBe(48);
  });

  test("can change size", () => {
    const size = 32;
    const wrapper = shallow(<Spinner size={size} />);
    const svg = wrapper.find("svg");
    expect(svg.prop("width")).toBe(size);
    expect(svg.prop("height")).toBe(size);
  });
});
