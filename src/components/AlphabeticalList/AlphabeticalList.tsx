import { Cell, Subheadline } from "@telegram-apps/telegram-ui";
import { FC, Fragment } from "react";

export interface AlphabeticalListProps {
  list: any[];
  filterField: string;
  onClickHandler: (item: any) => void;
}

export const AlphabeticalList: FC<AlphabeticalListProps> = ({
  list,
  filterField,
  onClickHandler,
}) => {
  let currentLetter = "";

  const sortAlphabetically = (fieldName: string) => (a: any, b: any) => {
    if (a[fieldName] < b[fieldName]) {
      return -1;
    }
    if (a[fieldName] > b[fieldName]) {
      return 1;
    }
    return 0;
  };

  return (
    <div className="flex flex-col">
      {list.sort(sortAlphabetically(filterField)).map((item) => {
        const municipalityTitle = item.municipalityTitle;
        const firstLetter = municipalityTitle.charAt(0);

        return (
          <Fragment key={item.municipalityId}>
            {currentLetter !== firstLetter
              ? ((currentLetter = firstLetter),
                (
                  <Subheadline
                    plain
                    weight="1"
                    className="flex justify-between px-6 [&:not(:first-of-type)]:mt-6 [&:first-of-type]:mt-2 mb-3 text-[--tgui--link_color]"
                  >
                    {firstLetter}
                  </Subheadline>
                ))
              : null}
            <Cell
              className="border-b border-[--tg-theme-secondary-bg-color]"
              onClick={() => onClickHandler(item)}
            >
              {municipalityTitle}
            </Cell>
          </Fragment>
        );
      })}
    </div>
  );
};
