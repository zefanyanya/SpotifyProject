import { Provider } from "react-redux";
import Searchbar from "./index";
import { render, screen, cleanup } from "@testing-library/react";
import store from "../../store";

const setup = () =>
  render(
    <Provider store={store}>
      <Searchbar />
    </Provider>
  );

describe("Search bar should rendered", () => {
  beforeEach(setup);
  afterEach(cleanup);

  it("Success rendered", () => {
    const searchInput = screen.getByTestId("search-input");
    const buttonsearch = screen.getByTestId("search-button");

    expect(searchInput).toBeInTheDocument();
    expect(buttonsearch).toBeInTheDocument();
  });
});
