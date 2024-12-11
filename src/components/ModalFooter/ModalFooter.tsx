import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { Button, Divider } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { FC, MouseEventHandler } from "react";

export interface ModalFooterProps {
  onClick: () => void;
}

export const ModalFooter: FC<ModalFooterProps> = ({ onClick }) => {
  const hapticFeedback = useHapticFeedback();

  return (
    <div className="sticky bottom-0">
      <Divider />
      <div className="p-5 bg-[--tg-theme-header-bg-color]">
        <ModalClose>
          <Button
            size="l"
            stretched
            onClick={() => {
              hapticFeedback.impactOccurred("light");
              onClick();
            }}
          >
            არჩევა
          </Button>
        </ModalClose>
      </div>
    </div>
  );
};
