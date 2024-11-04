import { Button, Divider } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { FC, MouseEventHandler } from "react";

export interface ModalFooterProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ModalFooter: FC<ModalFooterProps> = ({ onClick }) => {
  return (
    <div className="">
      <Divider />
      <div className="p-5 bg-[--tg-theme-header-bg-color]">
        <ModalClose>
          <Button size="l" stretched onClick={onClick}>
            არჩევა
          </Button>
        </ModalClose>
      </div>
    </div>
  );
};
