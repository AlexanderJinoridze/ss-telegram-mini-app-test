import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { Cell, Checkbox } from "@telegram-apps/telegram-ui";
import { FC, MouseEventHandler, PropsWithChildren, ReactNode } from "react";

export interface ModalCellProps {
  isChecked?: boolean;
  isSelected?: boolean;
  value?: number | string | string[];
  before?: ReactNode;
  after?: ReactNode;
  changeHandler?: (value: string, checked: boolean) => void;
  clickHandler?: (isSelected?: boolean) => void;
}

export const ModalCell: FC<PropsWithChildren<ModalCellProps>> = ({
  children,
  isChecked,
  isSelected,
  value,
  before,
  after,
  changeHandler,
  clickHandler,
}) => {
  const hapticFeedback = useHapticFeedback();
  const showCheckbox = isChecked !== undefined && changeHandler;
  return (
    <Cell
      className={`px-6 transition-colors hover:bg-transparent ${
        isSelected
          ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
          : isChecked
          ? "!bg-[--tg-theme-secondary-bg-color]"
          : "bg-transparent"
      }`}
      Component={showCheckbox ? "label" : undefined}
      before={before}
      after={
        showCheckbox ? (
          <Checkbox
            checked={isChecked}
            value={value}
            onChange={(event) => {
              const target = event.target;
              changeHandler(target.value, target.checked);
            }}
          />
        ) : isSelected ? (
          <span className="material-symbols-outlined">check</span>
        ) : after ? (
          after
        ) : null
      }
      onClick={() => {
        hapticFeedback.impactOccurred("soft");
        clickHandler?.(isSelected);
      }}
    >
      {children}
    </Cell>
  );
};
