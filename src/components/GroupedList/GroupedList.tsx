import { Subheadline } from "@telegram-apps/telegram-ui";
import { FC, Fragment } from "react";
import ModalCell from "../ModalCell";
import { District, SubDistrict } from "@/types";

export interface GroupedListProps {
  list: District[];
  isChecked: (item: SubDistrict) => boolean;
  groupChangeHandler: (item: District, value: string, checked: boolean) => void;
  changeHandler: (item: SubDistrict, value: string, checked: boolean) => void;
}

export const GroupedList: FC<GroupedListProps> = ({
  list,
  isChecked,
  groupChangeHandler,
  changeHandler,
}) => (
  <>
    {list.map((item) => (
      <Fragment key={item.districtId}>
        <ModalCell
          value={item.subDistricts.map((item) => String(item.subDistrictId))}
          isChecked={item.subDistricts.every((item) => isChecked(item))}
          changeHandler={(value, checked) =>
            groupChangeHandler(item, value, checked)
          }
        >
          <Subheadline weight="1">{item.districtTitle}</Subheadline>
        </ModalCell>
        {item.subDistricts.map((item) => (
          <ModalCell
            key={item.subDistrictId}
            value={item.subDistrictId}
            isChecked={isChecked(item)}
            changeHandler={(value, checked) =>
              changeHandler(item, value, checked)
            }
          >
            {item.subDistrictTitle}
          </ModalCell>
        ))}
      </Fragment>
    ))}
  </>
);
