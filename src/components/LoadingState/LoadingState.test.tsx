import { render } from "@testing-library/react-native"
import { LoadingState } from "./LoadingState"

describe("Component: LoadingState", () => {
  it("should render the message", () => {
    const message = "Teste de Loading..."
    const { getByText, debug } = render(<LoadingState message={message} />)
    debug()
    expect(getByText(message)).toBeTruthy()
  })
})