import { cryptoAlertsMock } from "@__mocks__/storage/cryptoAlerts";
import { act, renderHook, waitFor } from "@__tests__/utils/test-utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAlerts } from "./useAlertProvider";

describe("Context: useAlerts", () => {
  it("should add an alert", async () => {
    const { result } = renderHook(() => useAlerts())
    
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
  it("should delete an alert", async () => {
    const { result } = renderHook(() => useAlerts())
    
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

  it('should load alerts from AsyncStorage', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockResolvedValue(JSON.stringify(cryptoAlertsMock));
    const { result } = renderHook(() => useAlerts())
    await waitFor(() => {
      expect(result.current.alerts).toHaveLength(2);
    });
  });

  it('should save alerts to AsyncStorage', async () => {
    const { result } = renderHook(() => useAlerts())
    
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
    expect(AsyncStorage.setItem).toHaveBeenCalledWith("cryptoAlerts", JSON.stringify(result.current.alerts));
    await AsyncStorage.clear();
  });
})