import { render, screen } from "@testing-library/react"
import App from "./App"

test("20 Images must be Loaded from Giphy", async () => {
  const observe = jest.fn()

  window.IntersectionObserver = jest.fn(function () {
    this.observe = observe
  })

  render(<App />)
  const images = await screen.findAllByRole("img")
  expect(images).toHaveLength(20)
})
