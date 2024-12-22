import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { Button, Headline } from "@telegram-apps/telegram-ui";
import { FC } from "react";
import { ModalHeader as ModalCap } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

export interface ModalHeaderProps {
  title: string;
  onClear: () => void;
}

export const ModalHeader: FC<ModalHeaderProps> = ({ title, onClear }) => {
  const hapticFeedback = useHapticFeedback();

  return (
    <>
      <ModalCap />
      <div className="flex sticky bg-[--tgui--bg_color] top-0 z-10 justify-between items-center px-6 pb-4 [&+div]:flex [&+div]:flex-col [&+div]:flex-grow-[1]">
        <Headline plain weight="2" className="flex justify-between">
          {title}
        </Headline>
        <Button
          size="s"
          mode="bezeled"
          className="flex-shrink-0"
          onClick={() => {
            hapticFeedback.impactOccurred("rigid");
            onClear();
          }}
        >
          გასუფთავება
        </Button>
      </div>
    </>
  );
};
