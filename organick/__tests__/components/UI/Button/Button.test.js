/* eslint-disable testing-library/prefer-screen-queries */
/* eslint-disable testing-library/render-result-naming-convention */
import React from "react";

import { render } from "@testing-library/react";
import Button from "../../../../src/components/UI/Button/Button";
import "@testing-library/jest-dom";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Button", () => {
  it("renders without errors", () => {
    render(<Button>Hello</Button>);
  });

  it("renders correct text", () => {
    const buttonView = render(<Button>Hello</Button>);

    expect(buttonView.getByText("Hello")).toBeInTheDocument();
  });

  it("calls onClick function", () => {
    const onClick = jest.fn();
    const buttonView = render(<Button onClick={onClick}>Hello</Button>);

    buttonView.getByText("Hello").click();

    expect(onClick).toHaveBeenCalled();
  });
});
