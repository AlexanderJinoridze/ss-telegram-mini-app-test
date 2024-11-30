import { useLaunchParams } from "@telegram-apps/sdk-react";

export function usePlatform(): "ios" | "base" | undefined {
  const lp = useLaunchParams();

  return ["macos", "ios"].includes(lp.platform) ? "ios" : "base";
}
