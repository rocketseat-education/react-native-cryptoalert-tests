import AsyncStorage from "@react-native-async-storage/async-storage";
import { render, waitFor } from "@testing-library/react-native";
import { Text } from "react-native";
import { cryptoAlertsMock } from "../../../__mocks__/storage/cryptoAlerts";
import { AlertProvider } from "./AlertProvider";

describe("AlertProvider", () => {
  it("should render the children", () => {
    const { getByText } = render(
      <AlertProvider>
        <Text>Teste</Text>
      </AlertProvider>,
    )
    getByText("Teste")
    expect(getByText("Teste")).toBeTruthy()
  })

  it("should call AsyncStorage.getItem when the component is mounted", async() => {
    const asyncStorageGetItem = jest.spyOn(AsyncStorage, "getItem").mockResolvedValue(JSON.stringify(cryptoAlertsMock))
    render(
      <AlertProvider>
        <Text>Teste</Text>
      </AlertProvider>,
    )
    await waitFor(async () => {
      expect(asyncStorageGetItem).toHaveBeenCalledWith("cryptoAlerts")
    })
  })
})
