import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogFrom";
import { expect } from "vitest";

const handleCreateBlogMock = vi.fn();

describe("testing BlogForm", () => {
  test("submit BlogForm with the right data", async () => {
    const userEventController = userEvent.setup();

    render(<BlogForm handleCreateBlog={handleCreateBlogMock} />);

    const title = screen.getByPlaceholderText("blog title here");
    const author = screen.getByPlaceholderText("blog author");
    const url = screen.getByPlaceholderText("blog url");
    const button = screen.getByText("Create blog");

    expect(title).toBeVisible();
    expect(author).toBeVisible();
    expect(url).toBeVisible();

    await userEventController.type(title, "My title");
    await userEventController.type(author, "My author");
    await userEventController.type(url, "My url");
    await userEventController.click(button);

    expect(handleCreateBlogMock).toHaveBeenCalledTimes(1);
    expect(handleCreateBlogMock.mock.calls[0]).toStrictEqual([
      "My title",
      "My author",
      "My url",
    ]);
  });
});
