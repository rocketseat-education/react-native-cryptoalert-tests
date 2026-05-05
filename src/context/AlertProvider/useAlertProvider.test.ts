import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useAlertProviderState } from "./useAlertProvider";

describe("Context: AlertProvider", () => {
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
});