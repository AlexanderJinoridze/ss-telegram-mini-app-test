import { Subheadline } from "@telegram-apps/telegram-ui";
import { FC, Fragment } from "react";
import ModalCell from "../ModalCell";

export interface AlphabeticalListProps {
  list: any[];
  idField?: string;
  titleField?: string;
  clickHandler?: (item: any) => void;
  isChecked?: (item: any) => boolean;
  changeHandler?: (item: any, value: string, isChecked: boolean) => void;
}

export const AlphabeticalList: FC<AlphabeticalListProps> = ({
  list,
  idField = "id",
  titleField = "title",
  isChecked,
  clickHandler,
  changeHandler,
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
            <ModalCell
              value={item[idField]}
              isChecked={isChecked?.(item)}
              changeHandler={
                changeHandler
                  ? (value, checked) => changeHandler(item, value, checked)
                  : undefined
              }
              clickHandler={clickHandler ? () => clickHandler(item) : undefined}
              after={
                <span className="material-symbols-outlined">
                  keyboard_arrow_right
                </span>
              }
            >
              {title}
            </ModalCell>
          </Fragment>
        );
      })}
    </div>
  );
};
