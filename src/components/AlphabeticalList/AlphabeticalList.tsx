import { Cell, Checkbox, Subheadline } from "@telegram-apps/telegram-ui";
import { FC, Fragment } from "react";

export interface AlphabeticalListProps {
  list: any[];
  idField?: string;
  titleField?: string;
  onClickHandler?: (item: any) => void;
  isChecked?: (item: any) => boolean;
  onChangeHandler?: (item: any, isChecked: boolean, value: string) => void;
}

export const AlphabeticalList: FC<AlphabeticalListProps> = ({
  list,
  idField = "id",
  titleField = "title",
  isChecked,
  onClickHandler,
  onChangeHandler,
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
      {list.sort(sortAlphabetically(titleField)).map((item) => {
        const title = item[titleField];
        const firstLetter = title.charAt(0);

        return (
          <Fragment key={item[idField]}>
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
              className="px-6"
              Component={onChangeHandler && isChecked ? "label" : undefined}
              after={
                onChangeHandler && isChecked ? (
                  <Checkbox
                    value={item[idField]}
                    checked={isChecked(item)}
                    onChange={(event) => {
                      const target = event.target;

                      onChangeHandler(item, target.checked, target.value);
                    }}
                  />
                ) : null
              }
              onClick={onClickHandler ? () => onClickHandler(item) : undefined}
            >
              {title}
            </Cell>
          </Fragment>
        );
      })}
    </div>
  );
};
