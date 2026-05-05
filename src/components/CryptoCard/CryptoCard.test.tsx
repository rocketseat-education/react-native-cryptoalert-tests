import { AlertProvider } from "@context/AlertProvider/AlertProvider";
import { render, screen } from "@testing-library/react-native";
import { cryptoCurrenciesMock } from "../../../__mocks__/data/cryptoCurrencies";
import { formatPrice } from "../../utils";
import { CryptoCard } from "./CryptoCard";

jest.mock("@utils/index", () => ({
  formatPrice: jest.fn().mockReturnValue("1,000.00"),
  formatChange: jest.fn().mockReturnValue("+10.00%"),
}))
describe("Component: CryptoCard", () => {
  it("should render the crypto name, symbol and price", () => {
    const { getByText, debug } = render(
      <AlertProvider>
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
      </AlertProvider>
    )
    debug()
    const name =getByText(cryptoCurrenciesMock[0].name)
    const symbol = getByText(cryptoCurrenciesMock[0].symbol)
    const price = getByText(`$${formatPrice(cryptoCurrenciesMock[0].price)}`)
    expect(name).toBeTruthy()
    expect(symbol).toBeTruthy()
    expect(price).toBeTruthy()
  })

  it("should render first letter of the crypto symbol as avatar if crypto has no image", () => {
    render(
      <AlertProvider>
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], image: undefined }} />
      </AlertProvider>
    )
    const avatar = screen.getByText(cryptoCurrenciesMock[0].symbol.charAt(0))
    expect(avatar).toBeTruthy()
  })

  it("should render negative change correctly", () => {
    render(
      <AlertProvider>
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], change24h: -10 }} />
      </AlertProvider>
    )
    const change = screen.getByText("-10.00%")
    expect(change).toBeTruthy()
  })

  it("should render positive change correctly", () => {
    render(
      <AlertProvider>
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], change24h: 10 }} />
      </AlertProvider>
    )
    const change = screen.getByText("+10.00%")
    expect(change).toBeTruthy()
  })
})