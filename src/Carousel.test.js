import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("renders Carousel without crashing", function () {
    render(<Carousel />);
})

//snapshot test
it("matches snapshot", function () {
    const { asFragment } = render(<Carousel />);
    expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
    const { queryByTestId, queryByAltText } = render(<Carousel />);

    // expect the first image to show, but not the last
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
    const rightArrow = queryByTestId("right-arrow");
    const leftArrow = queryByTestId("left-arrow");

    // move forward in the carousel
    fireEvent.click(rightArrow);

    // move backward in the carousel
    fireEvent.click(leftArrow);

    // expect the first image to show again
    expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
    expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
});

it("hides arrows appropriately when end and beginning are reached", function () {
    const { getByTestId } = render(<Carousel />);
    const leftArrow = getByTestId("left-arrow");
    const rightArrow = getByTestId("right-arrow");

    //expect left arrow to be hidden and right arrow to be present
    expect(leftArrow).toHaveClass("hidden");
    expect(rightArrow).not.toHaveClass("hidden");

    //move forward and expect both arrows to be visible
    fireEvent.click(rightArrow);
    expect(leftArrow).not.toHaveClass("hidden");
    expect(rightArrow).not.toHaveClass("hidden");

    //move forward again and expect right arrow to be hidden and left arrow still visible
    fireEvent.click(rightArrow);
    expect(leftArrow).not.toHaveClass("hidden");
    expect(rightArrow).toHaveClass("hidden");
})
