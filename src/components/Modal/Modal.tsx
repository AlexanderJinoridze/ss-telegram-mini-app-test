import {
  ModalProps as ModalUIProps,
  Modal as ModalUI,
} from "@telegram-apps/telegram-ui";
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
import ModalHeader from "../ModalHeader";
import ModalTrigger from "../ModalTrigger";
import ModalContent from "../ModalContent";
import { useHapticFeedback } from "@telegram-apps/sdk-react";

export interface ModalProps {
  fullHeight?: boolean;
  title: string;
  isSelected: boolean;
  selectedLabel?: string;
  header?: ReactNode;
  onClear: () => void;
  onSelect: () => void;
  onOpenChange: ModalUIProps["onOpenChange"];
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  fullHeight,
  title,
  isSelected,
  selectedLabel,
  header,
  onClear,
  onSelect,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const hapticFeedback = useHapticFeedback();

  useEffect(() => {
    if (!isOpen) {
      hapticFeedback.impactOccurred("medium");
    }
  }, [isOpen]);

  return (
    <ModalUI
      header={<ModalHeader title={title} onClear={onClear} />}
      trigger={
        <div className="contents">
          <ModalTrigger
            label={title}
            isSelected={isSelected}
            selectedLabel={selectedLabel}
          />
        </div>
      }
      onOpenChange={(open) => {
        setIsOpen(open);
        onOpenChange?.(open);
      }}
      className={fullHeight ? "h-full" : undefined}
    >
      <ModalContent header={header} onSelect={onSelect}>
        {children}
      </ModalContent>
    </ModalUI>
  );
};
