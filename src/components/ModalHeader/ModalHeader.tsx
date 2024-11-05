import { Button, Divider, Headline } from "@telegram-apps/telegram-ui";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { FC, MouseEventHandler } from "react";

export interface ModalHeaderProps {
  title: string;
  onClear: MouseEventHandler<HTMLButtonElement>;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, onClear }) => {
  return (
    <div className="flex sticky bg-[--tgui--bg_color] top-0 z-10 justify-between items-center px-6 pb-4">
      <Headline plain weight="2" className="flex justify-between">
        {title}
      </Headline>
      <Button
        size="s"
        mode="bezeled"
        className="flex-shrink-0"
        onClick={onClear}
      >
        გასუფთავება
      </Button>
    </div>
  );
};
