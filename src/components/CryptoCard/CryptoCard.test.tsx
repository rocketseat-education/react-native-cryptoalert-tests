import { cryptoCurrenciesMock } from "@mocks/data/cryptoCurrencies";
import { fireEvent, render, screen } from "@testing-library/react-native";
import { formatChange } from "@utils/index";
import { CryptoCard } from "./CryptoCard";
import { useCryptoCard } from "./useCryptoCard";

jest.mock("@utils/index", () => ({
  formatPrice: jest.fn().mockReturnValue("1,000.00"),
  formatChange: jest.fn().mockReturnValue("+10.00%"),
}))

jest.mock("./useCryptoCard", () => ({
  useCryptoCard: jest.fn(),
}))
describe("Component: CryptoCard", () => {
  const defaultMock = {
    isPositive: true,
    hasAlert: true,
    alertsForCrypto: [{
      id: "1",
      cryptocurrency: "Bitcoin",
      symbol: "BTC",
      targetPrice: 100000,
      condition: "above",
      createdAt: new Date().toISOString(),
    }
  ],
    expanded: false,
    toggleExpanded: jest.fn(),
  }

  beforeEach(() => {
    (useCryptoCard as jest.Mock).mockReturnValue(defaultMock)
  })
  it("should render the crypto name, symbol and price", () => {
    const { getByText, getByLabelText } = render(
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const name =getByText(cryptoCurrenciesMock[0].name)
    const symbol = getByText(cryptoCurrenciesMock[0].symbol)
    const price = getByLabelText("Price")
    expect(name).toBeTruthy()
    expect(symbol).toBeTruthy()
    expect(price).toBeTruthy()
  })

  it("should render first letter of the crypto symbol as avatar if crypto has no image", () => {
    render(
        <CryptoCard crypto={{ ...cryptoCurrenciesMock[0], image: undefined }} />
    )
    const avatar = screen.getByText(cryptoCurrenciesMock[0].symbol.charAt(0))
    expect(avatar).toBeTruthy()
  })

  it("should render positive change correctly", () => {
    (formatChange as jest.Mock).mockReturnValue("+10.00%")
    render(
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const change = screen.getByText("+10.00%")
    expect(change).toBeTruthy()
  })

  it("should render negative change correctly", () => {
    (useCryptoCard as jest.Mock).mockReturnValue({...defaultMock, isPositive: false });
    (formatChange as jest.Mock).mockReturnValue("-10.00%")
    render(
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const change = screen.getByText("-10.00%")
    expect(change).toBeTruthy()
  })

  it("should render alert badge when has alerts", () => {
    render(
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const alertBadge = screen.getByLabelText("Toggle alerts for this cryptocurrency")
    expect(alertBadge).toBeTruthy()
  })
  it("should call toggleExpanded when alert badge is pressed", () => {
    const toggleExpanded: jest.Mock = jest.fn();
    (useCryptoCard as jest.Mock).mockReturnValue({...defaultMock, toggleExpanded })
    render(
        <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const alertBadge = screen.getByLabelText("Toggle alerts for this cryptocurrency")
    fireEvent.press(alertBadge)
    expect(toggleExpanded).toHaveBeenCalledTimes(1)
  })
  it("should render alert list when expanded", () => {
    (useCryptoCard as jest.Mock).mockReturnValue({
      ...defaultMock,
      alertsForCrypto: [...defaultMock.alertsForCrypto, {
          id: "2",
          cryptocurrency: "Ethereum",
          symbol: "ETH",
          targetPrice: 100000,
          condition: "below",
          createdAt: new Date().toISOString(),
        }],
      expanded: true,
    })
    render(
      <CryptoCard crypto={cryptoCurrenciesMock[0]} />
    )
    const alertList = screen.getByLabelText("Alert list")
    expect(alertList).toBeTruthy()
  })
})