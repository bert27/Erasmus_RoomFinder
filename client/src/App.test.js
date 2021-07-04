import { render, screen } from "@testing-library/react";
import { Routing } from "./Routing";
import {Button} from "./Components/Button/Button";
import {ElementCard} from "./Pages/Components/elements/ElementCard";



test("renders app ok", () => {
  render(<Routing />);
  const linkElement = screen.getByText("Filters:");
  expect(linkElement).toBeInTheDocument();

});
it("Check button render ok and have class",  () => {
  render(<Button />);
  const deleteButton = screen.getByTestId('button');
  expect(deleteButton).toHaveClass('button');

});

it("Check if Render card",  () => {
  render(<ElementCard />);
  const card = screen.getByTestId('card');
  expect(card).toBeInTheDocument();

});
