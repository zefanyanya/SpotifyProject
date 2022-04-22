import { render, screen, cleanup } from "@testing-library/react";
import CreatePlaylist from "./index";
import { Provider } from "react-redux";
import store from "../../store";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import config from "../../lib/config";

const setup = () =>
  render(
    <Provider store={store}>
      <CreatePlaylist />
    </Provider>
  );

const server = setupServer(
  rest.get(
    `${config.SPOTIFY_BASE_URL}/search?type=track&q=justin`,
    (req, res, ctx) => {
      return res(
        ctx.json({
          tracks: {
            items: [
              {
                id: "1",
                album: {
                  images: [
                    {
                      url: "test image url",
                    },
                  ],
                },
                name: "test title",
                artists: [
                  {
                    name: "test artist",
                  },
                ],
                uri: "test uri",
              },
            ],
          },
        })
      );
    }
  )
);

describe("Success render tracks after search", () => {
  beforeEach(setup);
  beforeAll(() => server.listen());
  afterEach(() => {
    server.resetHandlers();
    cleanup();
  });
  afterAll(() => server.close());

  it("Success render tracks after search", async () => {
    const searchInput = screen.getByTestId("search-input");
    const buttonSearch = screen.getByTestId("search-button");

    userEvent.type(searchInput, "justin");
    userEvent.click(buttonSearch);

    await screen.findByText("test title");
    const trackList = screen.getByTestId("tracks-list");

    expect(trackList.children.length).toBe(1);
    expect(screen.getByText("test title")).toBeInTheDocument();
  });
});
