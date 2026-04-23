import { cryptocurrencies, fetchCryptocurrenciesFromApi } from "./cryptoData"

describe("API: CryptoData", () => {
  it("should fetch cryptocurrencies from the API", async () => {
    jest.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: async () => cryptocurrencies
    } as Response)

    const data = await fetchCryptocurrenciesFromApi()
    console.log(data)
  })
})