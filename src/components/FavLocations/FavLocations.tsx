import { Chip, Radio } from "@telegram-apps/telegram-ui";
import { FC } from "react";

export interface FavLocationsProps {
  list: any[];
  titleField?: string;
  innserSectionField: string;
  onClickHandler: (item: any) => void;
  onChangeHandler: (item: any) => void;
}

export const FavLocations: FC<FavLocationsProps> = ({
  list,
  titleField = "title",
  innserSectionField,
  onClickHandler,
  onChangeHandler,
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
              "!bg-[--tg-theme-secondary-bg-color] whitespace-nowrap p-4"
            }
            after={
              isWithInner ? (
                <span className="material-symbols-outlined -mt-[1.5px]">
                  keyboard_arrow_right
                </span>
              ) : (
                <Radio
                  name="favCity"
                  onChange={() => onChangeHandler(item)}
                  className="block -mt-[1.5px] p-[2px]"
                />
              )
            }
            onClick={isWithInner ? () => onClickHandler(item) : undefined}
          >
            {item[titleField]}
          </Chip>
        );
      })}
    </>
  );
};
