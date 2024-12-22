import { FC, PropsWithChildren } from "react";

export const ModalPage: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div
      className="flex flex-col overflow-auto flex-grow-[1] zaza"
      onPointerMove={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  );
};
