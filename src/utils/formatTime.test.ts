import { formatPrice } from "."

test("formatPrice should format a price to 2 decimal places", () => {
  // executa o teste
  const formattedPrice = formatPrice(1000)
  expect(formattedPrice).toBe("1,000.00")
})