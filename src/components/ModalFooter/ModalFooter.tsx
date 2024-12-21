import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { Button, Divider } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { FC } from "react";

export interface ModalFooterProps {
  onClick: () => void;
}

export const ModalFooter: FC<ModalFooterProps> = ({ onClick }) => {
  const hapticFeedback = useHapticFeedback();

  return (
    <div className="flex items-stretch flex-col bg-[--tg-theme-header-bg-color]">
      <Divider />
      <ModalClose>
        <Button
          onClick={() => {
            hapticFeedback.impactOccurred("light");
            onClick();
          }}
          className="m-5"
          size="l"
        >
          არჩევა
        </Button>
      </ModalClose>
    </div>
  );
};
