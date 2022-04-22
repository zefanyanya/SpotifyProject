import { Provider } from "react-redux";
import { render, screen, cleanup } from "@testing-library/react";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import FormCreatePlaylist from "./index";

const setup = () =>
  render(
    <Provider store={store}>
      <FormCreatePlaylist />
    </Provider>
  );

test("Create playlist", () => {
  beforeEach(setup);
  afterEach(cleanup);

  it("Success rendered", () => {
    const titleInput = screen.getByTestId("playlist-title");
    const descriptionInput = screen.getByTestId("description");
    const buttonCreate = screen.getByTestId("btn");

    expect(titleInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(buttonCreate).toBeInTheDocument();
  });

  it("Form Typing", () => {
    const titleInput = screen.getByTestId("playlist-title");
    const descriptionInput = screen.getByTestId("description");

    userEvent.type(titleInput, "New Playlist");
    userEvent.type(descriptionInput, "New Playlist Description");

    expect(titleInput).toHaveValue("New Playlist");
    expect(descriptionInput).toHaveValue("New Playlist Description");
  });

  it("Title length is have to more than 10", () => {
    const titleInput = screen.getByTestId("playlist-title");
    const descriptionInput = screen.getByTestId("description");
    const buttonCreate = screen.getByTestId("btn");

    userEvent.type(titleInput, "New");
    userEvent.type(descriptionInput, "New Playlist Description");
    userEvent.click(buttonCreate);

    const errorText = screen.getByText(
      /TTitle and description must have more than 10 characters/i
    );

    expect(errorText).toBeInTheDocument();
  });
});
