import { Button, Text } from "@telegram-apps/telegram-ui";
import { FC, MouseEventHandler } from "react";

export interface BreadcrumbItemProps {
  isSelected: boolean;
  isNotSelected: boolean;
  selectedLabel: string;
  notSelectedLabel: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const BreadcrumbItem: FC<BreadcrumbItemProps> = ({
  isSelected,
  isNotSelected,
  selectedLabel,
  notSelectedLabel,
  onClick,
}) => (
  <>
    {isSelected ? (
      <Button
        size="s"
        onClick={onClick}
        after={<span className="material-symbols-outlined">close</span>}
      >
        {selectedLabel}
      </Button>
    ) : isNotSelected ? (
      <Text weight="1" className="truncate">
        {notSelectedLabel}
      </Text>
    ) : null}
  </>
);
