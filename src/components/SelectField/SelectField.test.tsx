import { fireEvent, render, screen } from "@testing-library/react-native"
import { SelectField } from "./SelectField"
describe("Component: SelectField", () => {
  it("should return the current value selected", () => {
    const options = [
      { value: "1", title: "Bitcoin-BTC" },
      { value: "2", title: "Ethereum-ETH" },
      { value: "3", title: "Litecoin-LTC" },
    ]
    render(
      <SelectField
      label="Select Field"
      options={options}
      value="1"
      onChange={() => {}}
      />
    )
    const selectedOption = screen.getByText(/bitcoin/i)
    fireEvent.press(selectedOption)
  })
})