import { Chip, Radio } from "@telegram-apps/telegram-ui";
import { FC } from "react";

export interface FavLocationsProps {
  list: any[];
  titleField?: string;
  innserSectionField: string;
  clickHandler: (item: any) => void;
  changeHandler: (item: any) => void;
}

export const FavLocations: FC<FavLocationsProps> = ({
  list,
  titleField = "title",
  innserSectionField,
  clickHandler,
  changeHandler,
}) => {
  return (
    <>
      {list.map((item) => {
        const isWithInner = item[innserSectionField].length;
        return (
          <Chip
            key={item.cityId}
            mode="elevated"
            Component="label"
            className={
              "!bg-[--tg-theme-secondary-bg-color] whitespace-nowrap p-4 h-14"
            }
            after={
              isWithInner ? (
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
              ) : (
                <div className="size-6 flex items-center justify-center">
                  <Radio name="favCity" onChange={() => changeHandler(item)} />
                </div>
              )
            }
            onClick={isWithInner ? () => clickHandler(item) : undefined}
          >
            {item[titleField]}
          </Chip>
        );
      })}
    </>
  );
};
