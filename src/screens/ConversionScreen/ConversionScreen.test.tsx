import { render } from "@testing-library/react-native"
import { ConversionScreen } from "./ConversionScreen"

jest.mock("@data/cryptoData", () => {
  const { cryptoCurrenciesMock, fiatCurrenciesMock } = require("@mocks/data/cryptoCurrencies")
  return {
    cryptocurrencies: cryptoCurrenciesMock,
    fiatCurrencies: fiatCurrenciesMock,
    fetchCryptocurrenciesFromApi: jest.fn().mockResolvedValue(cryptoCurrenciesMock),
  }
})

jest.mock("@utils/index", () => ({
  formatPrice: jest.fn((value) => value.toFixed(2))
}))

jest.mock("@expo/vector-icons", () => ({
  Ionicons: () => null
}))

describe("Screen: ConversionScreen", () => {
  it("should render correctly", () => {
    const { getByText } = render(<ConversionScreen />)
    expect(getByText("Convert Crypto")).toBeTruthy()
  })
})