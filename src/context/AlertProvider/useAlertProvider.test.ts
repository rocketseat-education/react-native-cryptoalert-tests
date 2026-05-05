import AsyncStorage from "@react-native-async-storage/async-storage";
import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useAlertProviderState } from "./useAlertProvider";

describe("Context: AlertProvider", () => {
  beforeEach(async () => {
    jest.clearAllMocks();
    await AsyncStorage.clear();
  });

  it("should add an alert", async () => {
    const { result } = renderHook(() => useAlertProviderState())
    
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
  });
  it("should delete an alert", async () => {
    const { result } = renderHook(() => useAlertProviderState())
    
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
    const alertToDelete = result.current.alerts[0];
    act(() => {
      result.current.deleteAlert(alertToDelete.id);
    });
    expect(result.current.alerts).toHaveLength(0);
  });
});