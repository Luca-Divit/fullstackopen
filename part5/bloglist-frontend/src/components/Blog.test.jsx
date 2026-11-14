import { render } from "@testing-library/react";
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
});
