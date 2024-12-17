import { useHapticFeedback } from "@telegram-apps/sdk-react";
import { FC } from "react";

export interface OwnerLogoProps {
  link: string;
  w: number;
  d: string;
}

export const OwnerLogo: FC<OwnerLogoProps> = ({ link, w, d }) => {
  const hapticFeedback = useHapticFeedback();

  return (
    <a
      href={link}
      target="_blank"
      className={`[&:hover_path]:fill-[--tg-theme-text-color]`}
      onClick={() => hapticFeedback.impactOccurred("soft")}
    >
      <svg
        className="h-9"
        viewBox={`0 0 ${w} 100`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={`fill-[--tg-theme-hint-color]`} d={d} />
      </svg>
    </a>
  );
};
