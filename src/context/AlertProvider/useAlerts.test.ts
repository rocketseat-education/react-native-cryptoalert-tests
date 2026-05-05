import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { AlertProvider } from "./AlertProvider";
import { useAlerts } from "./useAlertProvider";

describe("Context: useAlerts", () => {
  it("should add an alert", async () => {
    const { result } = renderHook(() => useAlerts(), { wrapper: AlertProvider })
    
    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(0);
    });

    act(() => {
      result.current.addAlert({
        cryptocurrency: "Bitcoin",
        symbol: "BTC",
        targetPrice: 100000,
        condition: "above",
      });
    });
    expect(result.current.alerts).toHaveLength(1);
    await AsyncStorage.clear();
  });
})