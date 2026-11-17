import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { expect } from "vitest";

const handleLikeMock = vi.fn();
const handleRemoveMock = vi.fn();

const blog = {
  title: "blog title",
  author: "blog author",
  url: "blog url",
  likes: "blog likes",
  user: { username: "username" },
};

const user = {
  username: "username",
};

describe("testing blog", () => {
  test("render only blog title and author by default", () => {
    const { container } = render(
      <Blog
        blog={blog}
        handleLike={handleLikeMock}
        handleRemove={handleRemoveMock}
        user={user}
      />,
    );

    expect(container.querySelector(".titleAndAuthor")).toBeVisible();
    expect(container.querySelector(".blogDetails")).toBeNull();
  });

  test("render url and likes when show button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <Blog
        blog={blog}
        handleLike={handleLikeMock}
        handleRemove={handleRemoveMock}
        user={user}
      />,
    );

    const url = screen.queryByText("blog url");
    const likes = screen.queryByText("blog likes");

    expect(url).toBeNull();
    expect(likes).toBeNull();

    const showButton = screen.getByRole("button");

    await user.click(showButton);

    const urlOnceMore = screen.queryByText("blog url");
    const likesOnceMore = screen.queryByText("blog likes");

    expect(urlOnceMore).toBeDefined();
    expect(likesOnceMore).toBeDefined();
  });
});
