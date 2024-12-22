import { Divider } from "@telegram-apps/telegram-ui";
import { FC, PropsWithChildren, ReactNode } from "react";
import ModalFooter from "../ModalFooter";

export interface ModalContentProps {
  header?: ReactNode;
  onSelect: () => void;
}

export const ModalContent: FC<PropsWithChildren<ModalContentProps>> = ({
  header,
  children,
  onSelect,
}) => (
  <div className="min-h-0 h-full flex flex-col flex-grow-[1]">
    {header ? (
      <>
        {header}
        <Divider />
      </>
    ) : null}
    <div
      className="flex flex-col overflow-auto flex-grow-[1]"
    >
      {children}
    </div>
    <ModalFooter onClick={onSelect} />
  </div>
);
