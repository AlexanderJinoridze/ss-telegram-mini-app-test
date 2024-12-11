import { FC } from "react";
import { Cell, Text } from "@telegram-apps/telegram-ui";
import { useHapticFeedback } from "@telegram-apps/sdk-react";

export interface ModalTriggerProps {
  label: string;
  selectedLabel?: string;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export const ModalTrigger: FC<ModalTriggerProps> = ({
  label,
  selectedLabel,
  isSelected = false,
  isDisabled = false,
}) => {
  const hapticFeedback = useHapticFeedback();

  return (
    <Cell
      disabled={isDisabled}
      onClick={() =>
        hapticFeedback.impactOccurred(isDisabled ? "soft" : "light")
      }
      after={
        <span className="material-symbols-outlined">keyboard_arrow_down</span>
      }
    >
      {isSelected ? (
        <Text weight="2">{selectedLabel ?? label}</Text>
      ) : (
        <Text>{label}</Text>
      )}
    </Cell>
  );
};
