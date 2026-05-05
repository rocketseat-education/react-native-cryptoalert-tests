import { renderHook, waitFor } from "@testing-library/react-native";
import { useAlertProviderState } from "./useAlertProvider";

describe("Context: AlertProvider", () => {
  it("should add an alert", async () => {
    const { result } = renderHook(() => useAlertProviderState())
    
    await waitFor(() => {
      console.log(result);
    });
  });
});