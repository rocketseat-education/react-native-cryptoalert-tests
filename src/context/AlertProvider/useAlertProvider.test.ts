import { renderHook } from "@testing-library/react-native";
import { useAlertProviderState } from "./useAlertProvider";

describe("Context: AlertProvider", () => {
  it("should add an alert", () => {
    const { result } = renderHook(() => useAlertProviderState())
    console.log(result);
  });
});