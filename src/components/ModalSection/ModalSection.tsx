import { Subheadline } from "@telegram-apps/telegram-ui";
import { FC, PropsWithChildren } from "react";

export interface ModalSectionProps {
  title?: string;
}

export const ModalSection: FC<PropsWithChildren<ModalSectionProps>> = ({
  title,
  children,
}) => {
  return (
    <div className="flex flex-col w-full [&:not(:last-child)]:mb-12">
      {title ? (
        <Subheadline
          plain
          weight="2"
          className="flex justify-between px-6 pb-2"
        >
          {title}
        </Subheadline>
      ) : null}
      {children}
    </div>
  );
};