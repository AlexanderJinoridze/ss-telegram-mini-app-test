"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  FixedLayout,
  Button,
  Divider,
  Text,
  Input,
  Placeholder,
  Radio,
  Checkbox,
  Caption,
  TabsList,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { Fragment, useEffect, useState } from "react";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider, useHapticFeedback } from "@telegram-apps/sdk-react";
import { ModalHeader as ModalCap } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import ModalFooter from "@/components/ModalFooter";
import ModalHeader from "@/components/ModalHeader";
import { SectionFooter } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionFooter/SectionFooter";
import { TabsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import { useForm } from "react-hook-form";
import { usePlatform } from "@/hooks/usePlatform";

type valueOf<T> = T[keyof T];

const numberPattern = /^\d+$/;

const dealTypeMap = [
  { id: 1, label: "ქირავდება" },
  { id: 2, label: "იყიდება" },
  { id: 3, label: "გირავდება" },
  { id: 4, label: "ქირავდება დღიურად" },
];

const propertyTypeMap = [
  {
    id: 1,
    label: "კერძო სახლი",
    iconName: "home",
  },
  {
    id: 2,
    label: "ბინა",
    iconName: "chair",
  },
  { id: 3, label: "მიწა", iconName: "psychiatry" },
  {
    id: 4,
    label: "კომერციული ფართი",
    iconName: "home_work",
  },
  { id: 5, label: "სასტუმრო", iconName: "hotel" },
  {
    id: 6,
    label: "აგარაკი",
    iconName: "cabin",
  },
];

const propertyTypeStatusMap: {
  [key in number]: { id: number; label: string }[];
} = {
  1: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
  2: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
  4: [
    { id: 13, label: "კვების ობიექტი" },
    { id: 14, label: "გარაჟი" },
    { id: 21, label: "სარდაფი" },
    { id: 22, label: "სავაჭრო ობიექტი" },
    { id: 31, label: "სხვა კომერციული ფართი" },
    { id: 6, label: "სასაწყობე / საწარმოო ფართი" },
    { id: 7, label: "საოფისე ფართი" },
  ],
  6: [
    { id: 2, label: "ახალი აშენებული" },
    { id: 3, label: "მშენებარე" },
    { id: 453, label: "ძველი აშენებული" },
  ],
};

const roomsMap = [
  { id: 1, label: "1 ოთახიანი" },
  { id: 2, label: "2 ოთახიანი" },
  { id: 3, label: "3 ოთახიანი" },
  { id: 4, label: "4 ოთახიანი" },
  { id: 5, label: "5 ოთახიანი" },
  { id: 6, label: "6+ ოთახიანი" },
];

const priceTypes = [
  { id: 1, label: "სრული" },
  { id: 2, label: "მ² - ის" },
];

const currencies = [
  { id: 1, label: "₾ - ლარში" },
  { id: 2, label: "$ - დოლარში" },
];

export default function Home() {
  const [dealType, setDealType] = useState<(typeof dealTypeMap)[number]>();
  const [dealTypeShadow, setDealTypeShadow] =
    useState<(typeof dealTypeMap)[number]>();
  const [propertyType, setPropertyType] =
    useState<(typeof propertyTypeMap)[number]>();
  const [propertyTypeShadow, setPropertyTypeShadow] =
    useState<(typeof propertyTypeMap)[number]>();
  const [statuses, setStatuses] = useState<
    valueOf<typeof propertyTypeStatusMap>
  >([]);
  const [statusesShadow, setStatusesShadow] = useState<
    valueOf<typeof propertyTypeStatusMap>
  >([]);
  const [rooms, setRooms] = useState<typeof roomsMap>([]);
  const [roomsShadow, setRoomsShadow] = useState<typeof roomsMap>([]);
  const [selectedPriceType, setSelectedPriceType] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<number>(1);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      hapticFeedback.impactOccurred("medium");
    }
  }, [isOpen]);

  const propertyTypeChange = (open: boolean) => {
    setIsOpen(open);
    setStatusesShadow([...statuses]);
    setPropertyTypeShadow(propertyType);
  };

  const propertyTypeClear = () => {
    hapticFeedback.impactOccurred("rigid");
    setStatusesShadow([]);
    setPropertyTypeShadow(undefined);
  };

  const propertyTypeOptionSelect = (item: (typeof propertyTypeMap)[number]) => {
    setStatusesShadow([]);
    setPropertyTypeShadow(
      item.id === propertyTypeShadow?.id ? undefined : item
    );
  };

  const propertyTypeChoose = () => {
    hapticFeedback.impactOccurred("light");
    setStatuses(statusesShadow);
    setPropertyType(propertyTypeShadow);
  };

  const checkArea = (areaType: "areaFrom" | "areaTo") => {
    if (numberPattern.test(getValues()[areaType]) && isSubmitted) {
      const areaFrom = getValues().areaFrom;
      const areaTo = getValues().areaTo;

      if (!areaFrom || !areaTo || Number(areaFrom) <= Number(areaTo)) {
        clearErrors(areaType);
      } else {
        setError(areaType, { type: "manual" });
      }
    }
  };

  const checkPrice = (priceType: "priceFrom" | "priceTo") => {
    if (numberPattern.test(getValues()[priceType]) && isSubmitted) {
      const priceFrom = getValues().priceFrom;
      const priceTo = getValues().priceTo;

      if (!priceFrom || !priceTo || Number(priceFrom) <= Number(priceTo)) {
        clearErrors(priceType);
      } else {
        setError(priceType, { type: "manual" });
      }
    }
  };

  const hapticFeedback = useHapticFeedback();
  const platform = usePlatform();
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitted },
  } = useForm();

  const currencySymbol = selectedCurrency === 1 ? "₾" : "$";
  const invalidInputClass =
    platform === "ios" && errors.areaFrom
      ? "!rounded-inherit !shadow-invalid_input"
      : undefined;

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <form onSubmit={handleSubmit(() => {})} className="flex flex-col">
          <List className="!mb-48">
            <SectionHeader>
              <Placeholder>
                <svg
                  width="132"
                  height="44"
                  viewBox="0 0 132 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    className="fill-[--tg-theme-accent-text-color]"
                    d="M8.92417 8H34.0758C34.5828 7.98906 35.0662 7.77483 35.4248 7.4021C35.7834 7.02938 35.9895 6.527 36 6C36 5.46957 35.7973 4.96086 35.4364 4.58579C35.0756 4.21071 34.5862 4 34.0758 4H8.92417C8.41385 4 7.92443 4.21071 7.56358 4.58579C7.20272 4.96086 7 5.46957 7 6C7 6.53043 7.20272 7.03914 7.56358 7.41421C7.92443 7.78929 8.41385 8 8.92417 8ZM66.154 28.6321H62.4847C61.1903 28.5946 59.8949 28.663 58.6116 28.8368C58.1359 28.8368 58 28.9732 58 29.4508V30.8152C58 31.2927 58.1359 31.4291 58.6116 31.4974C59.359 31.6338 60.1064 31.702 60.8539 31.7702L60.8539 31.7702C62.9965 32.0209 65.158 32.0666 67.3092 31.9067C68.2595 31.8636 69.1983 31.6797 70.0951 31.3609C70.8936 31.1216 71.5978 30.638 72.1094 29.9776C72.621 29.3172 72.9145 28.513 72.949 27.6771C73.017 26.7687 73.017 25.8566 72.949 24.9483C72.8605 23.8047 72.352 22.7349 71.5221 21.9466C70.9978 21.4358 70.3728 21.0408 69.6874 20.7869C69.0419 20.5481 68.4133 20.2923 67.7848 20.0364C67.1563 19.7806 66.5277 19.5248 65.8822 19.286C64.9989 18.9449 64.1835 18.6038 63.3001 18.1945C62.9632 18.0845 62.6607 17.8882 62.4224 17.625C62.1841 17.3618 62.0182 17.0408 61.9411 16.6937C61.829 16.2946 61.7831 15.8798 61.8052 15.4657C61.7607 14.9791 61.9057 14.4941 62.2098 14.1124C62.5138 13.7308 62.9533 13.4824 63.436 13.4191C63.9922 13.2839 64.5625 13.2152 65.1348 13.2145H71.3182C71.7939 13.2145 71.8618 13.078 71.8618 12.6005V11.0997C71.8618 10.6903 71.7939 10.5539 71.3862 10.4857C69.5471 10.1575 67.6821 9.99767 65.8143 10.0081C64.3943 9.96061 62.975 10.1215 61.6014 10.4857C60.7759 10.6521 60.021 11.0681 59.438 11.6778C58.8549 12.2876 58.4717 13.0619 58.3398 13.8967C58.1585 15.1199 58.1814 16.3649 58.4077 17.5805C58.4926 18.3591 58.8012 19.096 59.2959 19.7016C59.7905 20.3072 60.4499 20.7554 61.1937 20.9915C62.9604 21.6737 64.6591 22.3559 66.3579 23.0381C66.9933 23.2536 67.6074 23.5276 68.1925 23.8568C68.4962 24.016 68.755 24.2494 68.945 24.5356C69.135 24.8218 69.2501 25.1514 69.2797 25.494C69.3384 25.8547 69.3611 26.2203 69.3477 26.5855C69.3541 26.982 69.2315 27.3697 68.9985 27.6898C68.7655 28.0099 68.4348 28.245 68.0566 28.3593C67.4417 28.5546 66.7989 28.6468 66.154 28.6321ZM92.2003 28.9576C92.073 29.202 92.0043 29.4756 92 29.7546C92 31.0168 92.4648 31.648 93.328 31.9285C93.9591 32.084 94.6225 31.9839 95.1871 31.648C95.5167 31.4025 95.7647 31.0535 95.8958 30.6507C96.0269 30.2478 96.0345 29.8116 95.9175 29.4039C95.8727 29.0505 95.7075 28.7263 95.4527 28.4923C95.0586 28.1977 94.5931 28.028 94.1109 28.0032C93.6287 27.9783 93.1497 28.0994 92.7304 28.3521C92.5096 28.5052 92.3276 28.7131 92.2003 28.9576ZM79.7112 28.6723H83.2782C83.9169 28.6871 84.5536 28.5947 85.1626 28.3988C85.5108 28.3054 85.8214 28.1034 86.0508 27.8214C86.2802 27.5394 86.4167 27.1914 86.4414 26.8264C86.4539 26.3013 86.4314 25.776 86.3741 25.254C86.3206 24.9626 86.2017 24.6876 86.0266 24.4505C85.8515 24.2133 85.625 24.0204 85.3645 23.8866C84.8392 23.6079 84.3001 23.3569 83.7493 23.1346C81.9994 22.3826 80.2496 21.6989 78.4324 21.0152C77.6999 20.7602 77.0497 20.3072 76.5517 19.7049C76.0536 19.1026 75.7266 18.3738 75.6057 17.5969C75.3816 16.3786 75.3588 15.1309 75.5384 13.9051C75.6691 13.0685 76.0487 12.2925 76.6261 11.6815C77.2036 11.0704 77.9514 10.6535 78.7689 10.4867C80.1753 10.1216 81.6255 9.96049 83.0763 10.0082C84.8817 9.99773 86.6842 10.1579 88.4604 10.4867C88.8643 10.5551 88.9989 10.6918 88.9989 11.102V12.6745C88.9989 13.0847 88.8643 13.2214 88.4604 13.2214H82.2686C81.7018 13.2221 81.137 13.291 80.5861 13.4265C80.108 13.4899 79.6727 13.7389 79.3715 14.1213C79.0704 14.5038 78.9267 14.9898 78.9708 15.4775C78.9338 16.0101 79.0024 16.5448 79.1727 17.05C79.4341 17.5665 79.8616 17.9767 80.3842 18.2122C80.8216 18.4173 81.2759 18.6053 81.7302 18.7933C82.1845 18.9813 82.6388 19.1693 83.0763 19.3744C83.5785 19.5728 84.0808 19.783 84.5879 19.9952C85.3038 20.2948 86.0293 20.5983 86.7779 20.8785C87.5173 21.1549 88.1849 21.5992 88.7296 22.1775C89.3605 22.8523 89.7615 23.715 89.8738 24.6387C90.0421 25.7259 90.0421 26.8331 89.8738 27.9203C89.7854 28.7092 89.4701 29.4541 88.9674 30.062C88.4647 30.67 87.7968 31.114 87.0471 31.3386C85.9853 31.714 84.8731 31.9215 83.7493 31.9539C81.5264 32.0564 79.2991 31.9879 77.0864 31.7488L75.5384 31.5437C75.1346 31.4754 75 31.3386 75 30.9284V29.4243C75 29.0141 75.1346 28.8774 75.5384 28.8774C76.923 28.7116 78.3173 28.643 79.7112 28.6723ZM106.206 31.5269L108.708 31.3276V32.2575C108.695 32.604 108.591 32.9408 108.406 33.2328C108.221 33.5248 107.961 33.7614 107.654 33.9179C107.4 34.0154 107.134 34.0823 106.864 34.1172C106.319 34.1944 105.769 34.2388 105.218 34.25H101.268C100.807 34.25 100.741 34.3828 100.741 34.7813V36.1097C100.741 36.5082 100.873 36.641 101.333 36.7074C102.198 36.832 103.12 36.8982 103.992 36.9607L104.165 36.9731C105.64 37.0503 107.12 36.9612 108.576 36.7074C109.463 36.5597 110.275 36.1152 110.881 35.4455C111.44 34.7982 111.765 33.9787 111.802 33.1209C111.936 32.1526 112.002 31.1761 112 30.1985V17.1143C112 16.7158 111.868 16.583 111.473 16.5166C111.144 16.4723 110.815 16.4206 110.486 16.369C109.827 16.2657 109.169 16.1623 108.51 16.1181C106.736 15.9409 104.947 15.9632 103.177 16.1845C102.489 16.305 101.824 16.5289 101.202 16.8487C100.717 17.1559 100.301 17.5634 99.9837 18.0442C99.6659 18.525 99.4527 19.0682 99.3581 19.6382C99.1509 20.6883 99.0407 21.7556 99.0289 22.8262C98.9416 24.516 99.0521 26.2103 99.3581 27.8739C99.7532 29.8 100.807 30.9956 102.782 31.3276C103.912 31.5262 105.061 31.5931 106.206 31.5269ZM105.877 18.9076H108.708H108.774V28.4053L108.607 28.4207C107.947 28.4816 107.335 28.5381 106.667 28.5381C105.942 28.5381 105.218 28.5381 104.494 28.4717C103.978 28.4474 103.489 28.2297 103.124 27.8612C102.758 27.4926 102.543 26.9998 102.519 26.4792C102.311 24.9831 102.266 23.4686 102.387 21.9628C102.394 21.6049 102.438 21.2488 102.519 20.9001C102.545 20.3865 102.764 19.9022 103.13 19.5448C103.497 19.1874 103.984 18.9834 104.494 18.974C104.953 18.9188 105.415 18.8966 105.877 18.9076ZM118.418 25.3036C118.404 26.0241 118.494 26.7428 118.686 27.436C118.806 27.8448 119.042 28.2074 119.365 28.4771C119.687 28.7468 120.081 28.9113 120.495 28.9494C120.872 29.0046 121.253 29.0276 121.634 29.0182H126.459C126.928 29.0182 126.995 29.087 126.995 29.5685V31.0818C127.004 31.1542 127 31.2277 126.981 31.2982C126.962 31.3686 126.93 31.4346 126.887 31.4922C126.843 31.5498 126.789 31.5979 126.727 31.6338C126.665 31.6696 126.596 31.6924 126.526 31.7009C124.283 32.0111 122.015 32.0802 119.758 31.9073C119.024 31.8533 118.302 31.6911 117.614 31.4258C117.089 31.1815 116.624 30.8201 116.254 30.3678C115.883 29.9156 115.615 29.3839 115.469 28.8118C115.149 27.5311 114.991 26.2132 115 24.8909C115 23.6463 115.061 22.4641 115.125 21.2255V21.2254V21.2253V21.2252V21.2251V21.225L115.134 21.0387C115.187 20.2633 115.345 19.4992 115.603 18.7687C115.825 18.1615 116.194 17.622 116.675 17.2009C117.155 16.7798 117.732 16.4909 118.351 16.3611C120.402 15.8796 122.532 15.8796 124.583 16.3611C125.294 16.4982 125.951 16.8441 126.474 17.3569C126.997 17.8698 127.364 18.5274 127.531 19.2502C127.823 20.3495 127.98 21.4817 128 22.6208V24.6845C127.933 25.166 127.799 25.3036 127.33 25.3724H118.418V25.3036ZM118.418 22.8272H124.784C124.831 22.0148 124.74 21.2001 124.516 20.4196C124.411 20.0954 124.227 19.8046 123.98 19.5755C123.733 19.3464 123.433 19.1869 123.108 19.1126C122.042 18.8829 120.936 18.9302 119.892 19.2502C119.667 19.3064 119.459 19.4169 119.284 19.5724C119.109 19.7279 118.973 19.924 118.887 20.1444C118.51 20.8085 118.479 21.517 118.447 22.27C118.439 22.4531 118.431 22.6388 118.418 22.8272ZM22.1176 16H1.88235C1.38312 16 0.904338 15.7893 0.551328 15.4142C0.198319 15.0391 0 14.5304 0 14C0 13.4696 0.198319 12.9609 0.551328 12.5858C0.904338 12.2107 1.38312 12 1.88235 12H22.1176C22.6169 12 23.0957 12.2107 23.4487 12.5858C23.8017 12.9609 24 13.4696 24 14C24 14.5304 23.8017 15.0391 23.4487 15.4142C23.0957 15.7893 22.6169 16 22.1176 16ZM8.92417 24H34.0758C34.5829 23.9891 35.0662 23.7748 35.4248 23.4021C35.7834 23.0294 35.9895 22.527 36 22C36 21.4696 35.7973 20.9609 35.4364 20.5858C35.0756 20.2107 34.5862 20 34.0758 20H8.92417C8.41385 20 7.92443 20.2107 7.56358 20.5858C7.20272 20.9609 7 21.4696 7 22C7 22.5304 7.20272 23.0391 7.56358 23.4142C7.92443 23.7893 8.41385 24 8.92417 24ZM41.1839 32H20.8823C20.3831 32 19.9043 31.7893 19.5513 31.4142C19.1983 31.0391 19 30.5304 19 30C19 29.4696 19.1983 28.9609 19.5513 28.5858C19.9043 28.2107 20.3831 28 20.8823 28H41.1167C41.6159 28 42.0947 28.2107 42.4477 28.5858C42.8007 28.9609 42.999 29.4696 42.999 30C43.0071 30.259 42.9662 30.517 42.8787 30.7589C42.7912 31.0007 42.6589 31.2214 42.4896 31.4079C42.3204 31.5945 42.1176 31.743 41.8933 31.8447C41.669 31.9464 41.4278 31.9992 41.1839 32ZM8.92417 40H34.0758C34.5791 39.9773 35.0559 39.7592 35.4122 39.389C35.7684 39.0187 35.9781 38.5231 36 38C36 37.4696 35.7973 36.9609 35.4364 36.5858C35.0756 36.2107 34.5862 36 34.0758 36H8.92417C8.41385 36 7.92443 36.2107 7.56358 36.5858C7.20272 36.9609 7 37.4696 7 38C7 38.5304 7.20272 39.0391 7.56358 39.4142C7.92443 39.7893 8.41385 40 8.92417 40Z"
                  />
                </svg>
              </Placeholder>
            </SectionHeader>
            <Section>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                    }}
                    after={
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    }
                  >
                    {dealType === undefined ? (
                      "გარიგების ტიპი"
                    ) : (
                      <Text weight="2">{dealType.label}</Text>
                    )}
                  </Cell>
                }
                onOpenChange={(open) => {
                  setIsOpen(open);
                  setDealTypeShadow(dealType);
                }}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader
                  title="გარიგების ტიპი"
                  onClear={() => {
                    hapticFeedback.impactOccurred("rigid");
                    setDealTypeShadow(undefined);
                  }}
                />
                {dealTypeMap.map((item) => (
                  <Cell
                    key={item.id}
                    className={`px-6 transition-colors hover:bg-transparent ${
                      item.id === dealTypeShadow?.id
                        ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                        : "bg-transparent"
                    }`}
                    after={
                      item.id === dealTypeShadow?.id ? (
                        <span className="material-symbols-outlined">check</span>
                      ) : null
                    }
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                      setDealTypeShadow(
                        item.id === dealTypeShadow?.id ? undefined : item
                      );
                    }}
                  >
                    {item.label}
                  </Cell>
                ))}
                <ModalFooter
                  onClick={() => {
                    hapticFeedback.impactOccurred("light");
                    setDealType(dealTypeShadow);
                  }}
                />
              </Modal>
            </Section>
            <Section footer="სტატუსი ხელმისაწვდომია კერძო სახლის, ბინის, კომერციული ფართის და აგარაკის ქონების ტიპებისთვის">
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                    }}
                    after={
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    }
                  >
                    {propertyType === undefined ? (
                      "ქონების ტიპი"
                    ) : (
                      <Text weight="2">{propertyType.label}</Text>
                    )}
                  </Cell>
                }
                onOpenChange={propertyTypeChange}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader title="ქონების ტიპი" onClear={propertyTypeClear} />
                {propertyTypeMap.map((item) => (
                  <Cell
                    key={item.id}
                    className={`px-6 transition-colors hover:bg-transparent ${
                      item.id === propertyTypeShadow?.id
                        ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                        : "bg-transparent"
                    }`}
                    before={
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontVariationSettings:
                            item.id === propertyTypeShadow?.id
                              ? '"FILL" 1'
                              : undefined,
                        }}
                      >
                        {item.iconName}
                      </span>
                    }
                    after={
                      item.id === propertyTypeShadow?.id ? (
                        <span className="material-symbols-outlined">check</span>
                      ) : null
                    }
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                      propertyTypeOptionSelect(item);
                    }}
                  >
                    {item.label}
                  </Cell>
                ))}
                <ModalFooter onClick={propertyTypeChoose} />
              </Modal>
              {propertyType !== undefined &&
              propertyTypeStatusMap[propertyType.id] !== undefined ? (
                <Modal
                  header={<ModalCap />}
                  trigger={
                    <Cell
                      onClick={() => {
                        hapticFeedback.impactOccurred("soft");
                      }}
                      after={
                        <span className="material-symbols-outlined">
                          keyboard_arrow_down
                        </span>
                      }
                    >
                      {statuses.length ? (
                        <Text weight="2">
                          {statuses.map((status) => status.label).join(", ")}
                        </Text>
                      ) : (
                        "სტატუსი"
                      )}
                    </Cell>
                  }
                  onOpenChange={propertyTypeChange}
                  className="max-h-[calc(100%-1.5rem)]"
                >
                  <ModalHeader title="სტატუსი" onClear={propertyTypeClear} />
                  {propertyTypeStatusMap[propertyType.id].map(
                    ({ id, label }) => {
                      const statusIds = statusesShadow.map(
                        (status) => status.id
                      );
                      const isSelectedStatus = statusIds.includes(id);
                      return (
                        <Cell
                          key={id}
                          className={`px-6 transition-colors hover:bg-transparent ${
                            isSelectedStatus
                              ? "!bg-[--tg-theme-secondary-bg-color]"
                              : "bg-transparent"
                          }`}
                          after={<Checkbox checked={isSelectedStatus} />}
                          onClick={() => {
                            hapticFeedback.impactOccurred("soft");
                            if (isSelectedStatus) {
                              statusesShadow.splice(statusIds.indexOf(id), 1);
                              setStatusesShadow([...statusesShadow]);
                            } else {
                              setStatusesShadow([
                                ...statusesShadow,
                                { id, label },
                              ]);
                            }
                          }}
                        >
                          <Text weight="3">{label}</Text>
                        </Cell>
                      );
                    }
                  )}
                  <ModalFooter onClick={propertyTypeChoose} />
                </Modal>
              ) : (
                <Cell
                  disabled
                  hovered={false}
                  onClick={() => {
                    hapticFeedback.impactOccurred("light");
                  }}
                  after={
                    <span className="material-symbols-outlined">
                      keyboard_arrow_down
                    </span>
                  }
                >
                  სტატუსი
                </Cell>
              )}
            </Section>
            <Section>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                    }}
                    after={
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    }
                  >
                    მდებარეობა
                  </Cell>
                }
                onOpenChange={(open) => {
                  setIsOpen(open);
                  setDealTypeShadow(dealType);
                }}
                className="flex flex-col h-full max-h-[calc(100%-1.5rem)] [&>div]:flex [&>div]:flex-col [&>div]:h-full"
              >
                <ModalHeader
                  title="გარიგების ტიპი"
                  onClear={() => {
                    hapticFeedback.impactOccurred("rigid");
                    setDealTypeShadow(undefined);
                  }}
                />
                <div className="flex-grow">
                  <Input placeholder="Search location" />
                </div>
                <ModalFooter
                  onClick={() => {
                    hapticFeedback.impactOccurred("light");
                    setDealType(dealTypeShadow);
                  }}
                />
              </Modal>
            </Section>
            <SectionHeader>ფართი</SectionHeader>
            <Section>
              <Input
                placeholder="-დან"
                inputMode="numeric"
                after={<span className="w-6 text-center">მ²</span>}
                status={errors.areaFrom ? "error" : "default"}
                className={invalidInputClass}
                onClick={() => hapticFeedback.selectionChanged()}
                {...register("areaFrom", {
                  pattern: numberPattern,
                  validate: (areaFrom) =>
                    !areaFrom ||
                    !getValues().areaTo ||
                    areaFrom <= Number(getValues().areaTo),
                  onChange: () => checkArea("areaTo"),
                })}
              />
              <Input
                placeholder="-მდე"
                inputMode="numeric"
                after={<span className="w-6 text-center">მ²</span>}
                status={errors.areaTo ? "error" : "default"}
                className={invalidInputClass}
                onClick={() => hapticFeedback.selectionChanged()}
                {...register("areaTo", {
                  pattern: numberPattern,
                  validate: (areaTo) =>
                    !getValues().areaFrom ||
                    !areaTo ||
                    Number(getValues().areaFrom) <= areaTo,
                  onChange: () => checkArea("areaFrom"),
                })}
              />
            </Section>
            <Section>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                    }}
                    after={
                      <span className="material-symbols-outlined">
                        keyboard_arrow_down
                      </span>
                    }
                  >
                    {rooms.length ? (
                      <Text weight="2">
                        {rooms.map((room) => room.label).join(", ")}
                      </Text>
                    ) : (
                      "ოთახების რაოდენობა"
                    )}
                  </Cell>
                }
                onOpenChange={(open) => {
                  setIsOpen(open);
                  setRoomsShadow([...rooms]);
                }}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader
                  title="ოთახების რაოდენობა"
                  onClear={() => {
                    hapticFeedback.impactOccurred("rigid");
                    setRoomsShadow([]);
                  }}
                />
                {roomsMap.map(({ id, label }) => {
                  const roomIds = roomsShadow.map((room) => room.id);
                  const isSelectedRooms = roomIds.includes(id);
                  return (
                    <Cell
                      key={id}
                      className={`px-6 transition-colors hover:bg-transparent ${
                        isSelectedRooms
                          ? "!bg-[--tg-theme-secondary-bg-color]"
                          : "bg-transparent"
                      }`}
                      after={<Checkbox checked={isSelectedRooms} />}
                      onClick={() => {
                        hapticFeedback.impactOccurred("soft");
                        if (isSelectedRooms) {
                          roomsShadow.splice(roomIds.indexOf(id), 1);
                          setRoomsShadow([...roomsShadow]);
                        } else {
                          setRoomsShadow([...roomsShadow, { id, label }]);
                        }
                      }}
                    >
                      <Text weight="3">{label}</Text>
                    </Cell>
                  );
                })}
                <ModalFooter
                  onClick={() => {
                    hapticFeedback.impactOccurred("light");
                    setRooms(roomsShadow);
                  }}
                />
              </Modal>
            </Section>
            <SectionHeader>ფასი</SectionHeader>
            <Section>
              {priceTypes.map(({ id, label }) => (
                <Cell
                  key={id}
                  Component="label"
                  onClick={() => {
                    hapticFeedback.impactOccurred("soft");
                  }}
                  after={
                    <div className="m-0.5">
                      <Radio
                        name="radio"
                        onChange={() => setSelectedPriceType(id)}
                        checked={id === selectedPriceType}
                      />
                    </div>
                  }
                  multiline
                >
                  {label}
                </Cell>
              ))}
            </Section>
            <Section>
              <TabsList className="gap-0 h-12">
                {currencies.map(({ id, label }) => (
                  <TabsItem
                    key={id}
                    className="h-12"
                    type="button"
                    onClick={() => {
                      hapticFeedback.impactOccurred("soft");
                      setSelectedCurrency(id);
                    }}
                    selected={id === selectedCurrency}
                  >
                    <Subheadline
                      level="1"
                      plain
                      weight={id === selectedCurrency ? "2" : "3"}
                    >
                      {label}
                    </Subheadline>
                  </TabsItem>
                ))}
              </TabsList>
              <Input
                placeholder="-დან"
                inputMode="numeric"
                onClick={() => {
                  hapticFeedback.impactOccurred("soft");
                }}
                after={
                  <span className="w-6 text-center">{currencySymbol}</span>
                }
                status={errors.priceFrom ? "error" : "default"}
                className={invalidInputClass}
                {...register("priceFrom", {
                  pattern: numberPattern,
                  validate: (priceFrom) =>
                    !priceFrom ||
                    !getValues().priceTo ||
                    priceFrom <= Number(getValues().priceTo),
                  onChange: () => checkPrice("priceTo"),
                })}
              />
              <Input
                placeholder="-მდე"
                inputMode="numeric"
                onClick={() => {
                  hapticFeedback.impactOccurred("soft");
                }}
                after={
                  <span className="w-6 text-center">{currencySymbol}</span>
                }
                status={errors.priceTo ? "error" : "default"}
                className={invalidInputClass}
                {...register("priceTo", {
                  pattern: numberPattern,
                  validate: (priceTo) =>
                    !getValues().priceFrom ||
                    !priceTo ||
                    Number(getValues().priceFrom) <= priceTo,
                  onChange: () => checkPrice("priceFrom"),
                })}
              />
            </Section>
            <SectionFooter className="flex flex-col items-center mt-8">
              <div className="flex gap-6 mt-4 mb-6 justify-center">
                <a
                  href="https://lemondo.com"
                  target="_blank"
                  className="[&:hover_path]:fill-[--tg-theme-text-color]"
                  onClick={() => {
                    hapticFeedback.impactOccurred("soft");
                  }}
                >
                  <svg
                    className="h-9"
                    viewBox="0 0 308 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-[--tg-theme-hint-color]"
                      d="M7.78215 1.31332C6.84455 0.469043 5.53192 0 3.84425 0H0.187629V10.9756H3.93801C4.78184 10.9756 5.62568 10.8818 6.282 10.6004C7.03207 10.319 7.50087 9.94372 7.96967 9.47467C8.34471 9.00563 8.71974 8.44278 8.90726 7.69231C9.09478 7.03565 9.18854 6.19137 9.18854 5.25328C9.18854 3.47092 8.71974 2.1576 7.78215 1.31332ZM4.59433 9.7561H3.93801H1.59402V1.21951H4.03177C4.68809 1.21951 5.25064 1.31332 5.71944 1.50094C6.18824 1.68856 6.56328 1.96998 6.84455 2.25141C7.12583 2.62664 7.40711 3.00188 7.50087 3.56473C7.59463 4.12758 7.68839 4.69043 7.68839 5.34709C7.68839 6.09756 7.59463 6.66041 7.50087 7.12946C7.31335 7.69231 7.12583 8.06754 6.93831 8.34897C6.8408 8.44653 6.75456 8.5441 6.67177 8.63775L6.67176 8.63776C6.51574 8.81425 6.372 8.97687 6.18824 9.09944C5.90696 9.28706 5.62568 9.47467 5.3444 9.56848C5.2857 9.58806 5.23107 9.60764 5.17883 9.62637C4.98076 9.69736 4.8169 9.7561 4.59433 9.7561ZM14.0639 11.1632C15.0015 11.1632 15.7516 10.9756 16.3141 10.5066C16.9705 10.0375 17.3455 9.38086 17.4393 8.53658H16.1266C16.0329 9.00563 15.8453 9.38086 15.4703 9.66229C15.0953 9.94371 14.6265 10.0375 14.0639 10.0375C13.5951 10.0375 13.2201 10.0375 12.9388 9.8499C12.6575 9.75609 12.3762 9.56848 12.1887 9.28705C12.0012 9.00562 11.8137 8.7242 11.7199 8.44277C11.6262 8.06754 11.6262 7.78611 11.6262 7.41088H17.6268C17.7132 6.97835 17.6402 6.54582 17.5548 6.03973L17.533 5.90994C17.4393 5.34709 17.2517 4.87804 16.9705 4.409C16.6892 3.93996 16.3141 3.56472 15.8453 3.2833C15.3765 3.00187 14.814 2.81425 14.0639 2.81425C13.5014 2.81425 12.9388 2.90806 12.5638 3.18949C12.095 3.37711 11.7199 3.65853 11.3449 4.03377C11.0636 4.409 10.7823 4.87804 10.5948 5.34709C10.4073 5.90994 10.3135 6.47279 10.3135 7.03564C10.3135 7.31707 10.337 7.5985 10.3604 7.87992C10.3839 8.16135 10.4073 8.44277 10.4073 8.7242C10.5948 9.19324 10.8761 9.66228 11.1574 10.0375C11.5324 10.4128 11.9074 10.6942 12.3762 10.8818C12.845 11.0694 13.4076 11.1632 14.0639 11.1632ZM15.5641 4.69043C15.7516 4.87804 15.9391 5.06566 16.0329 5.34709C16.1266 5.62851 16.2204 5.90994 16.2204 6.28517H11.6262C11.6262 6.00375 11.7199 5.72233 11.8137 5.44091L11.8137 5.4409C11.9074 5.15947 12.095 4.87804 12.2825 4.69043C12.47 4.50281 12.6575 4.31519 12.9388 4.22138C13.2201 4.12758 13.5014 4.03377 13.8764 4.03377C14.2514 4.03377 14.5327 4.12758 14.814 4.22138C15.0953 4.31519 15.3765 4.50281 15.5641 4.69043ZM21.1896 10.9756L18.1893 3.00188H19.6895L21.9397 9.66229L24.0962 3.00188H25.5026L22.596 10.9756H21.1896ZM30.0968 11.1632C31.0344 11.1632 31.7845 10.9756 32.347 10.5066C32.9096 10.0375 33.2846 9.38086 33.4721 8.44277H32.1595C32.0658 9.00562 31.8782 9.38086 31.4094 9.66229C31.0344 9.94371 30.5656 10.0375 30.003 10.0375C29.5342 10.0375 29.1592 10.0375 28.8779 9.8499C28.5966 9.75609 28.3154 9.56848 28.1279 9.28705C27.9403 9.00562 27.7528 8.7242 27.6591 8.44277C27.5653 8.06754 27.5653 7.78611 27.5653 7.41088H33.5659C33.6524 6.97834 33.5794 6.54581 33.4939 6.03971L33.4721 5.90994C33.3784 5.34709 33.1909 4.87804 32.9096 4.409C32.6283 3.93996 32.2533 3.56472 31.7845 3.2833C31.3157 3.00187 30.7531 2.81425 30.003 2.81425C29.4405 2.81425 28.9717 2.90806 28.5029 3.18949C28.0341 3.37711 27.6591 3.65853 27.284 4.03377C27.0027 4.409 26.7215 4.87804 26.5339 5.34709C26.3464 5.90994 26.2527 6.47279 26.2527 7.03564C26.2527 7.5985 26.3464 8.16135 26.4402 8.7242C26.6277 9.19324 26.909 9.66228 27.1903 10.0375C27.5653 10.4128 27.9403 10.6942 28.4091 10.8818C28.8779 11.0694 29.4405 11.1632 30.0968 11.1632ZM31.5032 4.69043C31.6907 4.87804 31.8782 5.06566 31.972 5.34709C32.1595 5.62851 32.1595 5.90994 32.1595 6.28517H27.5653C27.5653 6.00375 27.6591 5.72232 27.7528 5.4409C27.8466 5.15947 28.0341 4.87804 28.2216 4.69043C28.4091 4.50281 28.5966 4.31519 28.8779 4.22138C29.1592 4.12758 29.4405 4.03377 29.8155 4.03377C30.1906 4.03377 30.4718 4.12758 30.7531 4.22138C31.0344 4.31519 31.3157 4.50281 31.5032 4.69043ZM36.3794 0V10.9756H35.0661V0H36.3794ZM38.9102 4.03377C38.5351 4.409 38.3476 4.87804 38.1601 5.34709C38.0664 5.90994 37.9726 6.47279 37.8788 6.94183C37.8788 7.50469 37.9726 8.06754 38.1601 8.53658C38.3476 9.00563 38.5351 9.47467 38.9102 9.8499C39.2852 10.2251 39.6603 10.5066 40.1291 10.6942C40.5979 10.8818 41.1604 10.9756 41.8167 10.9756C42.473 10.9756 43.0356 10.8818 43.5044 10.6942C43.9732 10.5066 44.3482 10.2251 44.7233 9.8499C45.0983 9.47467 45.2858 9.00563 45.4734 8.53658C45.6609 8.06754 45.7546 7.50469 45.7546 6.94183C45.7546 6.28517 45.6609 5.72232 45.4734 5.25328C45.2858 4.78424 45.0983 4.31519 44.7233 3.93996C44.3482 3.56472 43.9732 3.2833 43.5044 3.09568C43.0356 2.90806 42.473 2.81425 41.8167 2.81425C41.1604 2.81425 40.5979 3.00187 40.1291 3.18949C39.6603 3.37711 39.2852 3.65853 38.9102 4.03377ZM40.1291 9.28705C39.8478 9.00562 39.6603 8.7242 39.5665 8.34896C39.379 7.97373 39.379 7.50469 39.379 7.03564C39.379 6.5666 39.379 6.09756 39.5665 5.72232C39.754 5.34709 39.9415 5.06566 40.1291 4.78424C40.3166 4.59662 40.5979 4.31519 40.8791 4.22138C41.1604 4.12758 41.4417 4.03377 41.8167 4.03377C42.098 4.03377 42.473 4.12758 42.7543 4.22138C43.0356 4.31519 43.3169 4.50281 43.5044 4.78424C43.7857 5.06566 43.9732 5.34709 44.067 5.72232C44.1607 6.09756 44.2545 6.5666 44.2545 7.03564C44.2545 7.50469 44.1607 7.97373 44.067 8.34896C43.8794 8.7242 43.6919 9.00562 43.5044 9.28705C43.3169 9.47467 43.0356 9.75609 42.7543 9.8499C42.473 9.94371 42.1918 10.0375 41.8167 10.0375C41.5355 10.0375 41.1604 9.94371 40.8791 9.8499C40.5979 9.75609 40.3166 9.56848 40.1291 9.28705ZM48.5674 3.00187V4.03377C48.7549 3.56472 49.13 3.2833 49.5988 3.09568C50.0676 2.90806 50.6301 2.81425 51.1927 2.81425C51.849 2.81425 52.3178 2.90806 52.7866 3.18949C53.2554 3.37711 53.6304 3.75234 53.9117 4.12758C54.193 4.50281 54.4743 4.97185 54.568 5.4409C54.7555 5.90994 54.7555 6.47279 54.7555 7.03564C54.7555 7.5985 54.6618 8.16135 54.568 8.63039C54.3805 9.09943 54.193 9.56848 53.9117 9.94371C53.6304 10.3189 53.2554 10.6004 52.7866 10.788C52.3178 10.9756 51.7552 11.0694 51.1927 11.0694C51.0052 11.0694 50.8176 11.0694 50.5364 10.9756C50.3138 10.9756 50.1499 10.9169 49.9519 10.8459L49.9518 10.8459C49.8996 10.8271 49.845 10.8076 49.7863 10.788C49.742 10.7658 49.6925 10.7437 49.6403 10.7203C49.4712 10.6447 49.2732 10.5561 49.13 10.4128L48.5674 9.8499V14.0713H47.2548V3.00187H48.5674ZM53.2554 5.90994C53.1616 5.53471 52.9741 5.25328 52.7866 4.97185C52.5991 4.69043 52.3178 4.50281 52.0365 4.31519C51.7552 4.12758 51.3802 4.03377 50.9114 4.03377C50.4426 4.03377 50.0676 4.12758 49.7863 4.31519C49.505 4.50281 49.2237 4.69043 49.0362 4.97185C48.8487 5.25328 48.6612 5.53471 48.5674 5.90994C48.4737 6.28517 48.4737 6.66041 48.4737 7.03564C48.4737 7.41088 48.4737 7.78611 48.5674 8.16135C48.6612 8.53658 48.8487 8.81801 49.0362 9.09943C49.2237 9.38086 49.505 9.56848 49.7863 9.75609C50.0676 9.94371 50.4426 10.0375 50.9114 10.0375C51.3802 10.0375 51.7552 9.94371 52.0365 9.75609C52.3178 9.56848 52.5991 9.38086 52.7866 9.09943C52.9741 8.81802 53.0679 8.4428 53.1616 8.06758L53.1616 8.06754C53.3492 7.6923 53.4429 7.31707 53.4429 6.94183C53.4429 6.5666 53.3492 6.19137 53.2554 5.90994ZM59.7248 11.1632C60.6624 11.1632 61.4125 10.9756 61.975 10.5066C62.6313 10.0375 63.0064 9.38088 63.1939 8.44279H61.8813C61.7875 9.00564 61.5062 9.38088 60.9437 9.75611C60.5686 10.0375 60.0998 10.1313 59.5373 10.1313C59.0685 10.1313 58.6934 10.1313 58.4122 9.94373C58.1309 9.84992 57.8496 9.6623 57.6621 9.38088C57.4746 9.09945 57.2871 8.81803 57.1933 8.5366C57.0995 8.16137 57.0995 7.87994 57.0995 7.5047H63.1001C63.1866 7.07219 63.1136 6.63967 63.0282 6.13359L63.0064 6.00377C62.9126 5.44091 62.7251 4.97187 62.4438 4.50283C62.1625 4.03378 61.7875 3.65855 61.3187 3.37712C60.8499 3.0957 60.2874 2.90808 59.5373 2.90808C58.9747 2.90808 58.5059 3.00189 58.0371 3.18951C57.5683 3.37712 57.1933 3.65855 56.8183 4.03378C56.537 4.40902 56.2557 4.87806 56.0682 5.34711C55.8807 5.90996 55.7869 6.47281 55.7869 7.03566C55.7869 7.69232 55.8807 8.25517 56.0682 8.72422C56.2557 9.19326 56.537 9.6623 56.8183 10.0375C57.1933 10.4128 57.5683 10.6942 58.0371 10.8818C58.5059 11.0694 59.0685 11.1632 59.7248 11.1632ZM61.225 4.59664C61.4125 4.78425 61.6 5.06568 61.6938 5.34711C61.7875 5.62853 61.8813 5.90996 61.8813 6.28519H57.2871C57.2871 6.00377 57.3808 5.72234 57.4746 5.44091C57.5683 5.15949 57.7559 4.87806 57.9434 4.69045C58.0371 4.59664 58.1543 4.50283 58.2715 4.40902C58.3887 4.31521 58.5059 4.2214 58.5997 4.12759C58.881 4.03378 59.1622 3.93998 59.5373 3.93998C59.9123 3.93998 60.1936 4.03378 60.4749 4.12759C60.7562 4.2214 61.0374 4.40902 61.225 4.59664ZM70.4134 10.9756V9.94372C70.2259 10.4128 69.8508 10.6942 69.382 10.8818C68.9132 11.0694 68.4444 11.1632 67.8819 11.1632C67.2256 11.1632 66.7568 11.0694 66.288 10.788C65.8192 10.6004 65.4441 10.2251 65.1629 9.84991C64.8816 9.47467 64.6003 9.00563 64.5065 8.53659C64.319 8.06754 64.319 7.50469 64.319 6.94184C64.319 6.37899 64.4128 5.81614 64.5065 5.34709L64.5066 5.34701C64.6941 4.878 64.8816 4.40898 65.1629 4.03377C65.4441 3.65854 65.8192 3.37711 66.288 3.09569C66.3512 3.07986 66.4199 3.06136 66.4934 3.04154L66.4935 3.0415C66.8557 2.94387 67.3364 2.81426 67.8819 2.81426C68.0694 2.81426 68.3507 2.81426 68.5382 2.90807C68.7257 2.90807 69.007 3.00188 69.2883 3.09569C69.3325 3.11782 69.382 3.13995 69.4342 3.16331L69.4343 3.16335C69.6034 3.23901 69.8013 3.32759 69.9446 3.47092L70.5071 4.03377V0H71.8198V10.9756H70.4134ZM65.7254 8.16135C65.8192 8.53659 66.0067 8.81801 66.1942 9.09944C66.3817 9.38084 66.663 9.56845 66.9442 9.75606L66.9443 9.7561C67.2256 9.94372 67.6006 10.0375 68.0694 10.0375C68.5382 10.0375 68.9132 9.94372 69.1945 9.7561C69.4758 9.56848 69.7571 9.38086 69.9446 9.09944C70.1321 8.81801 70.3196 8.53659 70.3196 8.16135C70.4134 7.78612 70.4134 7.41088 70.4134 7.03565C70.4134 6.84803 70.39 6.66041 70.3665 6.4728L70.3665 6.47261C70.3431 6.28506 70.3196 6.0975 70.3196 5.90994C70.2259 5.53471 70.0384 5.25328 69.8508 4.97186C69.6633 4.69043 69.382 4.50281 69.1008 4.3152C68.8195 4.12758 68.3507 4.03377 67.9756 4.03377C67.5069 4.03377 67.1318 4.12758 66.8505 4.3152C66.5693 4.40901 66.288 4.69043 66.1005 4.97186C65.9129 5.25328 65.8192 5.62852 65.7254 6.00375C65.6317 6.28516 65.6317 6.66035 65.6317 7.12934V7.12946V7.12955C65.6317 7.50474 65.6317 7.78615 65.7254 8.16135ZM79.4143 4.12758V0H78.0079V10.9756H79.3205V9.94372L79.8831 10.5066C80.0706 10.6942 80.2581 10.788 80.5394 10.8818C80.5981 10.9014 80.6528 10.921 80.705 10.9397C80.9031 11.0107 81.0669 11.0694 81.2895 11.0694C81.5708 11.1632 81.7583 11.1632 81.9458 11.1632C82.5084 11.1632 83.0709 11.0694 83.5397 10.8818C84.0085 10.6942 84.3836 10.4128 84.6648 10.0375C84.9461 9.66231 85.1336 9.1933 85.3211 8.72429L85.3212 8.7242C85.4149 8.25516 85.5087 7.69231 85.5087 7.12946C85.5087 6.5666 85.5087 6.00375 85.3212 5.53471C85.2274 5.06567 84.9461 4.59662 84.6648 4.22139C84.3836 3.84615 84.0085 3.47092 83.5397 3.2833C83.0709 3.00188 82.6021 2.90807 81.9458 2.90807C81.3833 2.90807 80.9145 3.00188 80.4457 3.18949C79.9769 3.37711 79.6018 3.65854 79.4143 4.12758ZM83.6335 4.97186C83.821 5.25328 84.0085 5.53471 84.1023 5.90994C84.196 6.19137 84.2898 6.5666 84.1023 6.94184C84.1023 7.31707 84.1023 7.69231 84.0085 8.06754C83.9148 8.44278 83.821 8.81801 83.6335 9.09944C83.446 9.38086 83.1647 9.56848 82.8834 9.7561C82.6021 9.94372 82.2271 10.0375 81.7583 10.0375C81.3833 10.0375 80.9145 9.94372 80.6332 9.7561L80.6331 9.75606C80.3519 9.56845 80.0706 9.38084 79.8831 9.09944C79.6956 8.81801 79.5081 8.53659 79.4143 8.16135C79.3205 7.78615 79.3205 7.41094 79.3205 7.03574V7.03565V7.03556C79.3205 6.66035 79.3205 6.28515 79.4143 5.90994C79.5081 5.53471 79.6956 5.25328 79.8831 4.97186C80.0706 4.69045 80.3519 4.50284 80.6331 4.31523L80.6332 4.3152C80.9145 4.12758 81.2895 4.03377 81.7583 4.03377C82.2271 4.03377 82.6021 4.12758 82.8834 4.3152C83.1647 4.50281 83.446 4.69043 83.6335 4.97186ZM90.2904 12.1013C90.2121 12.2579 90.1502 12.4146 90.091 12.5644C90.0083 12.7735 89.9309 12.9693 89.8216 13.1332C89.7714 13.2086 89.7279 13.2773 89.6875 13.341C89.5771 13.5152 89.4901 13.6525 89.3528 13.7899C89.1653 13.9775 88.9778 14.0713 88.7903 14.1651C88.6027 14.2589 88.3215 14.2589 88.0402 14.2589H87.5714C87.4776 14.2589 87.4073 14.2355 87.337 14.212C87.2667 14.1885 87.1964 14.1651 87.1026 14.1651V12.9456C87.1964 13.0394 87.3839 13.0394 87.4776 13.0394C87.5875 13.0394 87.6652 13.0716 87.7295 13.0982C87.775 13.1171 87.8138 13.1332 87.8527 13.1332C88.1339 13.1332 88.3215 13.0394 88.509 12.9456C88.6965 12.8518 88.7903 12.6642 88.884 12.3827L89.4466 11.0694L86.2588 3.18948H87.7589L90.1029 9.75609L92.3531 3.18948H93.7595L90.2904 12.1013ZM88.2277 34.7092H80.7269V64.5404C80.7269 72.5141 85.2274 77.6736 93.7595 76.7355V69.9812C90.1029 70.2627 88.2277 68.7617 88.2277 64.6342V34.7092ZM125.075 67.5422C123.388 73.4522 118.231 77.4859 111.011 77.4859C102.76 77.4859 96.1035 70.7317 96.1035 62.2889C96.1035 53.8462 102.76 46.9043 111.011 46.9043C118.043 46.9043 123.95 51.3133 125.356 59.0994L104.729 67.7298C106.23 69.6998 108.386 70.8255 110.918 70.8255C113.355 70.8255 115.793 69.7936 117.106 67.4484H125.075V67.5422ZM116.731 56.0976C115.418 54.5028 113.355 53.4709 110.918 53.4709C106.605 53.4709 103.135 56.848 103.042 61.8199L116.731 56.0976ZM167.173 76.8293H174.58V59.9437C174.58 52.2514 169.798 46.9043 161.641 46.9043C157.891 46.9043 154.609 48.4991 152.359 51.0319C150.297 48.4991 147.015 46.9043 143.077 46.9043C135.107 46.9043 129.951 52.5328 129.951 59.9437V76.8293H137.451V59.7561C137.451 56.4728 139.702 54.2214 143.077 54.2214C148.046 54.2214 148.515 58.1614 148.515 59.7561V76.8293H156.016V59.7561C156.016 56.4728 158.36 54.2214 161.641 54.2214C166.611 54.2214 167.173 58.1614 167.173 59.7561V76.8293ZM208.896 62.2889C208.896 71.0131 202.239 77.4859 194.176 77.4859C186.113 77.4859 179.549 71.0131 179.549 62.2889C179.549 53.5647 186.113 46.9043 194.176 46.9043C202.239 46.9043 208.896 53.5647 208.896 62.2889ZM201.395 62.2889C201.395 57.2233 198.208 53.7524 194.176 53.7524C190.238 53.7524 186.956 57.2233 186.956 62.2889C186.956 67.167 190.144 70.6379 194.176 70.6379C198.114 70.6379 201.395 67.2608 201.395 62.2889ZM239.837 59.9437C239.837 52.2514 235.055 46.9043 226.898 46.9043C218.928 46.9043 213.772 52.5328 213.678 59.9437V76.8293H221.179V59.7561C221.179 56.4728 223.523 54.2214 226.804 54.2214C231.774 54.2214 232.336 58.1614 232.336 59.7561V76.8293H239.837V59.9437ZM274.622 62.2889C274.622 70.7317 268.433 77.4859 259.714 77.4859C250.9 77.4859 244.712 70.7317 244.712 62.2889C244.712 53.94 250.994 47.0919 258.589 47.0919C262.058 47.0919 264.871 48.1238 267.121 50.469V34.7092H274.622V62.2889ZM259.714 53.94C255.588 53.94 252.213 57.5047 252.213 62.2889C252.213 66.8856 255.588 70.4503 259.714 70.4503C263.839 70.4503 267.215 66.7918 267.215 62.2889C267.121 57.6923 263.839 53.94 259.714 53.94ZM293.28 77.4859C301.343 77.4859 308 71.0131 308 62.2889C308 53.5647 301.343 46.9043 293.28 46.9043C285.216 46.9043 278.653 53.5647 278.653 62.2889C278.653 71.0131 285.216 77.4859 293.28 77.4859ZM293.28 53.7524C297.311 53.7524 300.499 57.2233 300.499 62.2889C300.499 67.2608 297.218 70.6379 293.28 70.6379C289.248 70.6379 286.06 67.167 286.06 62.2889C286.06 57.2233 289.342 53.7524 293.28 53.7524ZM86.8213 99.2495C85.2274 99.2495 83.9148 98.4053 83.1647 97.2796V98.9681H81.477V83.7711H83.2584V90.0563C84.0085 89.0244 85.3212 88.1801 86.8213 88.1801C89.8216 88.1801 92.0718 90.713 92.0718 93.7148C92.0718 96.8105 89.8216 99.2495 86.8213 99.2495ZM86.8213 89.8687C84.8524 89.8687 83.2584 91.651 83.2584 93.8086C83.2584 95.9662 84.8524 97.7486 86.8213 97.7486C88.7903 97.7486 90.3842 95.9662 90.3842 93.8086C90.3842 91.5572 88.7903 89.8687 86.8213 89.8687ZM101.26 98.9681H102.948V88.4615H101.167V94.9343C101.167 96.5291 100.041 97.6548 98.4475 97.6548C96.7598 97.6548 95.8222 96.5291 95.8222 94.8405V88.4615H94.1345V94.8405C94.1345 97.3734 95.6347 99.2495 98.1662 99.2495C99.4788 99.2495 100.51 98.6867 101.26 97.8424V98.9681ZM109.792 99.2495C107.261 99.2495 105.386 97.8424 105.104 95.6848H106.886C107.073 96.9043 108.292 97.6548 109.792 97.6548C111.386 97.6548 112.418 96.8105 112.418 95.9662C112.418 95.2158 112.136 94.6529 109.511 94.3715C106.98 93.9963 105.386 93.4334 105.386 91.3696C105.386 89.8687 106.698 88.2739 109.511 88.2739C111.949 88.2739 113.543 89.4934 113.824 91.5572H112.043C111.761 90.4315 110.824 89.8687 109.511 89.8687C108.105 89.8687 107.167 90.5253 107.167 91.3696C107.167 92.1201 107.73 92.4015 109.792 92.6829C112.136 93.0582 114.012 93.5272 114.012 95.8724C114.105 97.9362 112.324 99.2495 109.792 99.2495ZM116.262 86.8668H117.95H118.044V84.803H116.262V86.8668ZM116.262 98.9681H117.95H118.044V88.4615H116.262V98.9681ZM129.763 98.9681H128.076V92.5891C128.076 90.9944 127.138 89.7749 125.544 89.7749C123.95 89.7749 122.825 90.9944 122.825 92.4953V98.9681H120.95V88.4615H122.637V89.5872C123.388 88.743 124.419 88.1801 125.732 88.1801C128.357 88.1801 129.763 90.0563 129.763 92.6829V98.9681ZM137.358 99.3433C139.795 99.3433 141.577 98.03 142.327 95.7786H140.452C139.889 96.9981 138.858 97.7486 137.358 97.7486C135.576 97.7486 133.889 96.4353 133.701 94.2777H142.514C142.514 90.5253 139.889 88.2739 137.17 88.2739C134.264 88.2739 131.92 90.8068 131.92 93.8086C131.92 96.9043 134.357 99.3433 137.358 99.3433ZM137.264 89.7749C138.764 89.7749 140.17 90.9944 140.639 92.6829H133.795C134.264 90.8068 135.858 89.7749 137.264 89.7749ZM148.515 99.2495C145.984 99.2495 144.108 97.8424 143.827 95.6848H145.609C145.796 96.9043 147.015 97.6548 148.515 97.6548C150.109 97.6548 151.14 96.8105 151.14 95.9662C151.14 95.2158 150.859 94.6529 148.328 94.3715C145.796 93.9963 144.202 93.4334 144.202 91.3696C144.202 89.8687 145.515 88.2739 148.328 88.2739C150.765 88.2739 152.359 89.4934 152.64 91.5572H150.859C150.578 90.4315 149.64 89.8687 148.328 89.8687C146.921 89.8687 145.89 90.5253 145.89 91.3696C145.89 92.1201 146.452 92.4015 148.515 92.6829C150.859 93.0582 152.734 93.5272 152.734 95.8724C152.828 97.9362 151.047 99.2495 148.515 99.2495ZM154.141 95.6848C154.422 97.8424 156.297 99.2495 158.829 99.2495C161.266 99.2495 163.142 97.9362 163.048 95.8724C163.048 93.5272 161.173 93.0582 158.829 92.6829C156.766 92.4015 156.203 92.1201 156.203 91.3696C156.203 90.5253 157.235 89.8687 158.641 89.8687C159.954 89.8687 160.891 90.4315 161.173 91.5572H162.954C162.673 89.4934 161.079 88.2739 158.641 88.2739C155.828 88.2739 154.516 89.8687 154.516 91.3696C154.516 93.4334 156.11 93.9963 158.641 94.3715C161.173 94.6529 161.454 95.2158 161.454 95.9662C161.454 96.8105 160.423 97.6548 158.829 97.6548C157.328 97.6548 156.11 96.9043 155.922 95.6848H154.141ZM12.8451 82.5516H13.5014H13.8764H14.1577H14.2514H14.439H14.814H15.0953C15.2828 82.5516 15.3766 82.5516 15.4703 82.4578H15.7516C15.9391 82.4578 16.0329 82.4578 16.1266 82.364L16.4079 82.2702C16.4548 82.2702 16.5251 82.2467 16.5954 82.2233C16.6658 82.1998 16.7361 82.1764 16.783 82.1764C14.0639 77.4859 12.6575 72.2327 12.6575 66.8856C12.6575 62.6642 13.5951 58.4428 15.2828 54.5966H15.0015H14.9078C14.064 54.5966 13.4077 54.6904 12.7514 54.7842L12.7513 54.7842C6.65693 55.8161 0 61.6323 0 69.2308C0 76.8293 6.84444 82.5516 12.8451 82.5516ZM30.0032 35.5535C41.4418 35.7411 51.5678 41.8386 56.6309 45.4972C64.3191 50.9381 69.0071 57.0356 69.5697 59.9437C70.0385 62.6642 67.4132 70.2627 62.3502 77.7674C58.6936 83.1144 50.8178 92.8705 38.8165 97.4672C34.4099 99.1557 29.8156 100 25.2214 100H24.9401H24.8464H24.5651C17.2519 99.8124 10.3137 96.06 5.43816 89.681C3.28169 86.773 1.59402 83.3959 0.468907 79.7373C0.526855 79.7373 0.548988 79.7732 0.579577 79.8227C0.598481 79.8533 0.620614 79.8891 0.656426 79.9249L0.843945 80.1126C0.890825 80.1595 0.937705 80.2298 0.984585 80.3002C1.03146 80.3706 1.07834 80.4409 1.12522 80.4878L1.31274 80.6754L1.78154 81.1445L1.8753 81.2383C2.0628 81.3321 2.25031 81.5197 2.43781 81.7073L2.43786 81.7073L2.53162 81.8011C2.62538 81.848 2.6957 81.9184 2.76602 81.9887C2.83634 82.0591 2.90666 82.1295 3.00041 82.1764L3.18793 82.364C3.23481 82.4109 3.30513 82.4578 3.37545 82.5047C3.44577 82.5516 3.51609 82.5985 3.56297 82.6454C3.59878 82.6812 3.62092 82.7171 3.63982 82.7477C3.67041 82.7972 3.69254 82.833 3.75049 82.833C3.79737 82.8799 3.8677 82.9268 3.93802 82.9737C4.00834 83.0206 4.07865 83.0675 4.12553 83.1144L4.31305 83.2083C4.50057 83.2083 4.59433 83.3021 4.68809 83.3959L4.8756 83.4897C4.8756 83.5835 4.96936 83.5835 4.96936 83.5835C5.06312 83.6304 5.18032 83.7007 5.29752 83.7711C5.41472 83.8415 5.53192 83.9118 5.62568 83.9587L5.71944 84.0525L6.282 84.334L6.46952 84.4278C6.56328 84.4278 6.63359 84.4512 6.70391 84.4747C6.77423 84.4981 6.84455 84.5216 6.93831 84.5216L7.21959 84.6154C7.26647 84.6623 7.33679 84.6857 7.40711 84.7092C7.47743 84.7326 7.54775 84.7561 7.59463 84.803L7.87591 84.8968C7.96966 84.9437 8.03998 84.9672 8.11029 84.9906C8.18062 85.0141 8.25094 85.0375 8.34471 85.0844L8.53223 85.1782C8.62599 85.2251 8.74319 85.2486 8.86038 85.272C8.97758 85.2955 9.09478 85.3189 9.18854 85.3659H9.2823C9.40563 85.407 9.51093 85.4301 9.60612 85.451C9.72802 85.4777 9.83332 85.5008 9.93862 85.5535H10.1261C10.2199 85.5535 10.2902 85.5769 10.3605 85.6004C10.4309 85.6238 10.5012 85.6473 10.5949 85.6473L10.8762 85.7411C10.97 85.8349 11.1575 85.8349 11.2513 85.8349H11.5325H12.0013H12.1888H12.8452C14.9079 85.8349 17.0643 85.5535 19.4083 84.8968C19.5021 84.8968 19.5958 84.8968 19.7834 84.803C19.8771 84.7092 19.8771 84.7092 19.9709 84.7092L22.1274 84.0525V83.9587C26.9091 82.1764 32.0659 78.9869 36.3788 75.0469C38.1602 73.4522 43.9733 67.9174 43.4108 64.6341C42.6607 60.6942 30.4719 53.94 20.6272 51.8762H20.5334L17.7207 51.5009C17.6269 51.5009 17.5097 51.4775 17.3925 51.454C17.2753 51.4306 17.1581 51.4071 17.0643 51.4071C15.1891 51.2195 13.5015 51.2195 12.0951 51.5009C12.0013 51.5009 11.8841 51.5244 11.7669 51.5478C11.6497 51.5713 11.5325 51.5947 11.4388 51.5947L11.2513 51.6885C11.1575 51.6885 11.0872 51.712 11.0169 51.7355C10.9465 51.7589 10.8762 51.7824 10.7825 51.7824L10.5012 51.8762C10.4543 51.8762 10.384 51.8996 10.3137 51.9231C10.2433 51.9465 10.173 51.97 10.1261 51.97L9.84486 52.0638C9.79798 52.0638 9.72766 52.0872 9.65734 52.1107C9.58702 52.1341 9.5167 52.1576 9.46982 52.1576C9.42294 52.1576 9.37606 52.181 9.32918 52.2045C9.2823 52.228 9.23542 52.2514 9.18854 52.2514C9.09478 52.2983 9.02446 52.3218 8.95414 52.3452C8.88382 52.3687 8.8135 52.3921 8.71974 52.439L8.53223 52.5328C8.29783 52.6266 8.08687 52.7204 7.87591 52.8143C7.66495 52.9081 7.45399 53.0019 7.21959 53.0957L6.93831 53.1895C6.89143 53.2364 6.82112 53.2598 6.7508 53.2833C6.68048 53.3068 6.61016 53.3302 6.56328 53.3771L5.90696 53.7523C5.90696 53.7523 5.8132 53.8462 5.71944 53.8462C5.67256 53.8931 5.60224 53.94 5.53192 53.9869C5.4616 54.0338 5.39128 54.0807 5.3444 54.1276C5.3444 54.2214 5.25064 54.3152 5.15688 54.3152C5.06313 54.3621 4.99281 54.409 4.92249 54.4559C4.85217 54.5028 4.78185 54.5497 4.68809 54.5966C4.59433 54.5966 4.50057 54.6904 4.50057 54.6904C4.31305 54.8311 4.12553 54.9953 3.93801 55.1595C3.75049 55.3236 3.56297 55.4878 3.37545 55.6285L3.28169 55.7223H3.18793C3.15954 55.7507 3.13116 55.7877 3.10017 55.8281C3.0288 55.9211 2.94364 56.0322 2.81289 56.0976L2.71914 56.2852C2.65376 56.416 2.54282 56.5012 2.44985 56.5726C2.40947 56.6036 2.37249 56.632 2.3441 56.6604L2.15658 56.848L1.78154 57.2233L1.59402 57.4109L1.21898 57.7861L1.12522 57.8799L1.03146 57.9737C0.900723 58.0391 0.815559 58.1501 0.744195 58.2432C0.713204 58.2836 0.684815 58.3206 0.656426 58.349L0.468907 58.5366C0.375148 58.7242 0.281388 58.818 0.187629 58.9118C0.843945 56.5666 1.68778 54.409 2.81289 52.3452C2.81289 52.2514 2.81289 52.2514 2.90665 52.1576L3.09417 51.7824L3.37545 51.2195C3.46921 50.9381 3.65673 50.5628 3.93801 50.1876C4.20372 49.6559 4.5165 49.2184 4.80966 48.8083C4.93027 48.6396 5.04756 48.4755 5.15688 48.3114L5.3444 48.03C5.90694 47.2796 6.46947 46.6229 7.032 45.9663L7.03207 45.9662L7.12583 45.8724C7.59463 45.3096 8.15719 44.7467 8.8135 44.09L9.00102 43.9024L9.2823 43.621C9.52976 43.3734 9.80335 43.152 10.0617 42.9428C10.2928 42.7558 10.5116 42.5787 10.6887 42.4015C10.8293 42.2608 10.9934 42.1435 11.1575 42.0263C11.3216 41.909 11.4856 41.7917 11.6263 41.651C11.8667 41.5307 12.0686 41.3719 12.2567 41.2239C12.362 41.1411 12.4629 41.0617 12.5639 40.9944H12.6576C12.9365 40.7711 13.2154 40.5811 13.4745 40.4046C13.651 40.2843 13.8183 40.1703 13.9703 40.0563C14.3453 39.8687 14.6266 39.681 14.9079 39.4934C15.2829 39.212 15.5642 39.0244 16.033 38.8368C16.6121 38.4747 17.3029 38.1685 18.0623 37.8319C18.2866 37.7324 18.5169 37.6304 18.752 37.5234L19.0333 37.4296C19.2208 37.3827 19.3849 37.3124 19.549 37.242C19.713 37.1717 19.8771 37.1013 20.0646 37.0544H20.1584C21.5648 36.5854 23.0649 36.2101 24.4713 35.9287C26.2528 35.6473 28.128 35.5535 30.0032 35.5535Z"
                    />
                  </svg>
                </a>
                <a
                  href="http://palitra.ge"
                  target="_blank"
                  className="[&:hover_path]:fill-[--tg-theme-text-color]"
                  onClick={() => {
                    hapticFeedback.impactOccurred("soft");
                  }}
                >
                  <svg
                    className="h-9"
                    viewBox="0 0 120 100"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      className="fill-[--tg-theme-hint-color]"
                      d="M43.6803 21.0584C43.6803 9.9919 43.7701 0.739402 43.857 0.472991V0.481943C43.9048 0.349582 43.9899 0.233885 44.1021 0.148878C44.2143 0.0638708 44.3488 0.0131904 44.4893 0.00299072C47.0115 2.06079 49.3987 4.27843 51.636 6.64228C57.9767 13.0062 58.3272 13.3894 58.504 14.6496C58.8276 17.0264 58.522 56.084 58.1804 56.2037C53.2482 51.7944 48.5825 47.0966 44.2076 42.1349C43.7372 41.2938 43.7102 39.5037 43.6803 21.0584ZM61.4137 13.551C61.6624 13.111 64.7338 9.88417 68.2547 6.36695C71.8026 2.87666 74.8381 0.00299072 75.0149 0.00299072C75.1917 0.00299072 75.4854 0.260436 75.6622 0.559774C76.0727 1.38595 76.0727 39.9138 75.6322 41.4973C75.3715 42.4611 74.077 43.901 68.5305 49.4716C66.2655 51.8689 63.8801 54.1498 61.3837 56.3055C60.7964 56.3055 60.8144 14.6676 61.4137 13.551ZM0.0988783 44.5835C-0.224746 45.1103 0.422479 45.8437 6.96688 52.3663L13.4544 58.826L34.8945 58.9158C51.5701 58.9727 56.3345 58.9158 56.3345 58.6164C52.1091 53.8652 47.6065 49.3673 42.8502 45.1462L41.5288 44.2961H20.9037C7.75197 44.2841 0.206753 44.4009 0.0988783 44.5835ZM63.772 58.9187C68.0898 53.9106 72.7592 49.2161 77.7447 44.8708C78.7006 44.3559 79.7254 44.314 99.026 44.311C110.871 44.2781 119.453 44.4009 119.72 44.5775C120.454 45.0474 119.63 46.0173 112.999 52.5847C107.95 57.5687 106.454 58.8888 105.66 59.0654C103.841 59.4187 64.0057 59.26 63.772 58.9187ZM6.75113 68.4437C4.32368 70.6874 2.06707 73.1088 0 75.6877C0.119861 76.0289 3.70068 76.0978 20.7599 76.1876C39.4282 76.2445 41.4538 76.2175 42.3049 75.7775C47.2291 71.4323 51.9032 66.8121 56.3046 61.9391C56.3046 61.6727 51.8428 61.5978 34.9634 61.5978H13.5922L6.75113 68.4437ZM70.7748 69.1053C68.3749 66.8428 66.0917 64.46 63.9337 61.9661C63.9337 61.3764 105.618 61.3944 106.727 61.9781C107.18 62.2115 110.338 65.2319 113.772 68.6923C118.204 73.1464 120.026 75.146 119.936 75.5261C119.849 76.053 119.025 76.0829 99.7392 76.1727C88.673 76.1996 79.159 76.1727 78.6017 76.053C77.7627 75.9033 76.4112 74.709 70.7748 69.1053ZM0.824048 88.3856C0.824048 89.2088 1.99869 90.2625 3.31715 90.5857C4.46183 90.8851 4.67754 91.0228 4.57866 91.5825C4.52173 92.0525 4.25506 92.262 3.69771 92.3159C2.99353 92.4057 2.87364 92.5494 2.87364 93.2858C2.87364 94.0221 2.96355 94.1359 3.43101 93.9892C4.86934 93.5522 5.63343 96.6593 4.42882 98.0063C3.34408 99.2037 1.55217 98.0363 1.75593 96.2761C1.84583 95.5158 1.75595 95.1925 1.34543 94.983C0.611283 94.6029 0.323631 94.8363 0.113874 96.0038C-0.0237107 96.6845 0.0554291 97.3911 0.34025 98.0246C0.625071 98.658 1.10128 99.1865 1.70203 99.536C2.30233 99.885 2.99688 100.038 3.68843 99.9728C4.37998 99.9079 5.0339 99.6285 5.55856 99.1738C5.88365 98.9121 6.14678 98.5818 6.32913 98.2066C6.51148 97.8314 6.60851 97.4206 6.6133 97.0036C6.75226 96.4408 6.76635 95.8544 6.65454 95.2856C6.54273 94.7168 6.30772 94.1793 5.96604 93.7108C5.58548 93.3307 5.58552 93.184 6.02301 92.4177C6.81709 91.0108 6.32266 89.9841 4.52475 89.4243C3.86096 89.238 3.24686 88.9067 2.72682 88.4544C2.28933 87.8857 0.824048 87.7959 0.824048 88.3856ZM10.0713 88.8586C10.0414 88.6307 10.0608 88.3989 10.1282 88.1791C10.1851 88.0624 10.5657 87.9756 10.9553 87.9786C11.5695 87.9786 11.6595 88.1193 11.6595 88.9993C11.6735 89.7402 11.9793 90.4457 12.5105 90.963C14.5271 93.2798 14.9077 94.103 14.9077 96.2134C14.9077 98.617 14.2425 99.6108 12.5105 99.9102C10.0443 100.293 8.45922 99.0571 8.45922 96.7432C8.45922 95.2166 8.9296 93.8396 9.45699 93.8396C10.308 93.8695 10.5028 94.2826 10.1612 95.3662C9.75669 96.7462 10.0563 97.8896 10.9553 98.2997C12.5674 99.0241 13.7091 97.4466 13.2716 95.1327C12.909 94.1583 12.3616 93.2629 11.6595 92.4956C10.9847 91.7945 10.4731 90.9533 10.1612 90.032C10.1527 89.6395 10.1227 89.2478 10.0713 88.8586ZM22.9264 88.2719C22.5677 88.4257 22.2616 88.6805 22.0454 89.0053C21.8117 89.4154 21.7218 89.4154 21.2214 88.8586C20.984 88.6332 20.6999 88.4627 20.3891 88.3592C20.0784 88.2557 19.7488 88.2219 19.4235 88.2599C19.0391 88.2008 18.6458 88.2542 18.2911 88.4135C17.9364 88.5729 17.6356 88.8314 17.4248 89.1579C16.7446 89.9512 16.6637 90.3313 16.6637 92.1753C16.5666 93.3597 16.8021 94.5477 17.3439 95.6057C18.2127 96.9392 19.4137 98.0242 20.8289 98.7542C22.2442 99.4841 23.8251 99.834 25.4165 99.7695L27.2384 99.9162V99.093C27.2384 98.3326 27.1815 98.2997 25.1259 98.0962C23.9888 98.0648 22.8697 97.8045 21.8358 97.3308C20.8019 96.8571 19.8744 96.1797 19.1088 95.3393C17.9102 93.5432 17.9102 90.6486 19.1088 89.9003C20.0467 89.3016 20.6371 90.047 20.721 91.8969C20.8109 93.5073 20.8378 93.5403 21.6589 93.5403C22.4799 93.5403 22.5399 93.5103 22.5399 91.9867C22.5399 90.3762 22.8814 89.7297 23.7714 89.7297C24.4756 89.7297 24.8861 90.6097 24.8861 92.1932C24.8861 93.4235 24.943 93.5522 25.6203 93.5522C26.2975 93.5522 26.3544 93.4624 26.3544 92.1154C26.3544 90.5618 26.8548 89.7356 27.8197 89.7356C29.1801 89.7356 29.4319 92.6093 28.2602 94.6358C27.8497 95.3153 27.3612 95.896 27.1455 95.896C26.9297 95.896 27.0886 96.1954 27.4691 96.5426L28.1164 97.1892L28.8775 96.4558C31.1369 94.3604 31.4036 89.6818 29.318 88.5682C28.8168 88.3228 28.2566 88.2229 27.7014 88.2801C27.1461 88.3372 26.6182 88.5491 26.1776 88.8915C25.7371 89.3914 25.5783 89.4184 25.3266 89.0681C24.8667 88.5801 24.2904 88.2165 23.6516 88.0115C23.4007 88.0722 23.1552 88.1533 22.9175 88.2539L22.9264 88.2719ZM33.6676 89.0584C34.0808 88.6371 34.5998 88.3345 35.1702 88.1821L35.1672 88.1731C35.9397 87.9645 36.763 88.0595 37.4675 88.4387C38.1721 88.8179 38.7043 89.4524 38.9548 90.2116C39.3659 92.6088 39.3659 95.0584 38.9548 97.4556C38.6641 98.5422 37.5464 99.979 36.9891 99.979C36.4317 99.979 36.4317 98.62 36.9891 97.9405C37.7472 95.4367 37.7577 92.7662 37.0191 90.2565C36.8796 90.0862 36.7019 89.9511 36.5005 89.8622C36.299 89.7733 36.0794 89.733 35.8594 89.7447C35.6393 89.7562 35.425 89.8194 35.2339 89.9291C35.0429 90.0389 34.8804 90.1921 34.7597 90.3763C34.1041 92.9137 34.0938 95.5747 34.7297 98.1171C35.2571 98.8206 35.2871 99.994 34.7867 99.994C34.1814 99.994 33.1446 98.7308 32.8209 97.6143C32.4394 95.2839 32.4394 92.9072 32.8209 90.5768C32.9619 90.0041 33.2543 89.4797 33.6676 89.0584ZM44.3845 88.4755C44.5043 88.8556 44.2675 89.155 43.4465 89.592C42.6216 90.1381 41.9622 90.8994 41.5396 91.7933C41.1171 92.6871 40.9475 93.6795 41.0493 94.6628C41.0493 98.0932 42.5476 99.8533 45.4542 99.8533C48.5646 99.8533 49.9729 97.9765 49.8261 94.1659C49.9594 92.9873 49.638 91.8023 48.9272 90.8522C48.4648 90.2692 47.885 89.7899 47.2252 89.4453C46.5449 89.146 46.3742 88.9454 46.491 88.5473C46.6678 88.0474 46.521 87.9905 45.4692 87.9905C44.4174 87.9905 44.2676 88.0624 44.3845 88.4755ZM44.6511 92.9656L44.4744 95.3124H46.4101L46.2063 92.9656C45.9726 90.3853 46.1494 90.1188 47.351 91.3551C47.9982 91.9717 48.0851 92.325 48.0851 94.3724C48.0851 97.0096 47.5577 98.0693 46.0445 98.3895C45.4799 98.4589 44.907 98.3755 44.3857 98.148C43.8643 97.9205 43.4138 97.5573 43.081 97.0964C42.6765 95.4218 42.696 93.6729 43.1379 92.0077C43.4615 91.3611 44.2226 90.6487 44.6061 90.6307C44.7718 91.3997 44.7882 92.1934 44.6541 92.9685L44.6511 92.9656ZM54.5541 89.1677C55.531 88.5977 56.6387 88.2892 57.7699 88.272C58.27 88.2042 58.7547 88.1202 59.102 88.06C59.3687 88.0138 59.5543 87.9816 59.6038 87.9816C59.7177 87.9816 59.8075 88.3318 59.8075 88.8317C59.8075 89.6549 59.7477 89.7118 58.6899 89.7118C57.1914 89.7618 55.7373 90.2328 54.4947 91.0708C54.228 91.3911 54.2849 91.4809 54.9322 91.4809C55.4405 91.5202 55.9204 91.7314 56.2926 92.0795L56.9099 92.6962L57.671 92.0795C58.0285 91.8166 58.4407 91.6376 58.877 91.5557C59.3133 91.4738 59.7624 91.4912 60.1911 91.6066C60.6201 91.7222 61.0175 91.9329 61.3537 92.2231C61.6899 92.5134 61.9562 92.8756 62.1328 93.2829C62.5852 94.7016 62.543 96.2316 62.013 97.6233C61.4916 98.644 59.9364 100.003 59.2891 100.003C58.9655 100.003 58.7887 99.7695 58.7887 99.2696C58.7887 98.8595 58.9056 98.5363 59.0225 98.5363C59.3865 98.3643 59.7079 98.1138 59.9634 97.8029C60.5507 97.2461 60.6975 96.8031 60.6975 95.5728C60.6975 93.3158 59.5619 92.2891 58.3003 93.4625C57.9198 93.7858 57.7729 94.3485 57.7729 95.3693C57.7729 96.7462 57.743 96.7761 56.8919 96.7761C56.0409 96.7761 56.011 96.7582 56.011 95.3992C56.011 93.223 54.5427 92.1663 53.5448 93.6032C53.1114 94.3579 52.962 95.2424 53.1235 96.0975C53.285 96.9525 53.7469 97.7218 54.4258 98.2669C54.6335 98.3628 54.8098 98.5154 54.9344 98.7071C55.059 98.8989 55.1268 99.1219 55.13 99.3505C55.13 99.9701 55.0401 100.027 54.3359 99.8503C53.7005 99.6336 53.1223 99.2764 52.6444 98.8053C52.1666 98.3341 51.8013 97.7612 51.5761 97.1294C51.1884 95.2431 51.4044 93.2827 52.1933 91.5258C52.764 90.5499 53.5772 89.7377 54.5541 89.1677ZM65.8126 88.4127C65.7226 89.0612 65.7817 89.7217 65.9852 90.344C66.1887 90.9664 66.5313 91.5343 66.9872 92.0047C68.6622 93.9115 68.9229 94.4683 68.9229 96.0847C68.9229 98.3716 67.6285 99.2816 66.2531 97.9047C65.9343 97.4312 65.7544 96.8781 65.7337 96.3079C65.7131 95.7377 65.8525 95.173 66.1362 94.6778C66.4029 93.9743 65.1144 93.7079 64.6379 94.3545C64.1187 95.148 63.918 96.1079 64.0757 97.0427C64.2334 97.9776 64.738 98.8187 65.4889 99.3984C65.8789 99.6561 66.3165 99.8333 66.776 99.9197C67.2356 100.006 67.7078 99.9998 68.1648 99.9013C68.6217 99.8027 69.0542 99.614 69.437 99.3462C69.8199 99.0784 70.1453 98.7369 70.3942 98.3417C70.7829 96.8394 70.7726 95.2619 70.3643 93.7648C69.8827 92.9922 69.3439 92.2568 68.7522 91.5647C67.7813 90.3913 67.4577 89.7447 67.4577 88.9844C67.4577 88.0864 67.3678 87.9636 66.7235 87.9636C66.5493 87.9528 66.3752 87.9867 66.2178 88.0622C66.0605 88.1376 65.925 88.2521 65.8245 88.3947L65.8126 88.4127ZM75.6801 90.496C75.6801 89.7925 76.8518 88.5622 77.8227 88.2958C78.2551 88.1593 78.7105 88.1104 79.1621 88.1521C79.457 88.222 79.7581 88.2621 80.061 88.2719C80.5639 88.3818 81.0235 88.6368 81.3825 89.0053C82.1436 89.7087 82.1436 89.7386 82.1436 93.8724V93.8725V98.0064L81.1458 99.0032C80.8991 99.326 80.5786 99.585 80.211 99.7585C79.8434 99.9319 79.4395 100.015 79.0333 100C76.4772 100 75.1558 98.15 75.4794 95.0429C75.4616 94.5344 75.5671 94.0291 75.7867 93.5699C76.0064 93.1108 76.3336 92.7114 76.7409 92.4058C77.0217 92.0296 77.4116 91.7489 77.8576 91.6016C78.3036 91.4544 78.7841 91.4477 79.234 91.5826C80.7892 91.7532 81.026 91.4868 80.3787 90.2894C79.9262 89.4692 77.7327 89.4962 77.529 90.3194C77.3552 91.0228 75.6801 91.1994 75.6801 90.496ZM80.4178 95.7249C80.4126 94.9359 80.2227 94.159 79.8633 93.4564H79.8303C78.4789 92.2261 77.1275 93.3666 77.1485 95.7434C77.1485 96.9737 77.3102 97.5065 77.7477 97.9435C77.8672 98.1144 78.0252 98.2548 78.2089 98.3536C78.3926 98.4524 78.597 98.5067 78.8056 98.5122C79.0143 98.518 79.2215 98.4746 79.4104 98.3857C79.5993 98.2968 79.7647 98.1648 79.8932 98.0004C80.2433 97.2931 80.423 96.5138 80.4178 95.7249ZM86.246 88.3587C85.7101 88.5463 85.2491 88.9017 84.9317 89.3719C84.6142 89.8422 84.4572 90.4024 84.484 90.9689C84.484 91.9059 84.8255 92.1992 85.6825 91.9388C86.093 91.7921 86.2099 91.5975 86.0931 91.2054C85.7544 90.1218 87.6782 89.2417 88.5292 90.0889C88.8993 91.4244 89.0152 92.8175 88.8708 94.1958C88.8708 97.5963 88.814 97.9345 88.3136 98.2399C86.7014 99.09 85.4639 98.0632 85.7306 96.0697C85.8774 94.9531 85.8504 94.7496 85.35 94.6328C84.5259 94.4293 84.0284 95.2315 84.0284 96.803C83.9686 97.2039 84.0067 97.6132 84.1392 97.9963C84.2717 98.3793 84.4948 98.7247 84.7896 99.0032C85.1818 99.34 85.6369 99.5958 86.1285 99.7561C86.6202 99.9164 87.1387 99.9779 87.6542 99.9371C88.1725 99.8981 88.6778 99.7566 89.1408 99.5207C89.6038 99.2849 90.0153 98.9593 90.3512 98.5631C90.5954 97.1037 90.6957 95.6239 90.6507 94.1449C90.6507 90.1009 90.3271 88.7568 89.2723 88.4844C88.317 88.1025 87.2597 88.0581 86.2758 88.3587H86.246ZM92.6165 92.9895C92.5896 90.2057 93.0599 88.9425 94.2915 88.3857H94.2946C94.767 88.1663 95.2927 88.0883 95.8086 88.1611C96.3244 88.2339 96.808 88.4543 97.2011 88.7958C97.6206 89.146 97.7855 89.1789 97.9623 88.9125C98.3437 88.6013 98.7872 88.375 99.263 88.2485C99.7389 88.1221 100.236 88.0984 100.722 88.1792C101.27 88.3429 101.766 88.6462 102.16 89.0592C102.718 89.6759 102.832 90.1518 102.921 92.1664C103.011 94.1809 102.922 94.7167 102.394 95.5399C102.152 95.9718 101.801 96.3329 101.375 96.5871C100.95 96.8412 100.465 96.9797 99.9699 96.9887C99.4742 96.9975 98.9848 96.8763 98.5505 96.6373C98.1162 96.3984 97.7523 96.0499 97.4948 95.6267C96.9431 94.7759 96.7028 93.7606 96.8147 92.7531C96.8147 90.6337 96.464 89.7357 95.6399 89.7357C94.1117 89.7357 93.6142 93.2529 94.8458 95.5998C95.1768 96.4025 95.7451 97.0852 96.475 97.5565C97.2049 98.0277 98.0616 98.2652 98.9302 98.2369L98.9784 98.2409C100.661 98.3807 100.749 98.388 100.779 99.1739C100.809 99.9671 100.746 99.997 99.1339 99.997C97.9949 100.031 96.868 99.7546 95.8748 99.1965C94.8815 98.6384 94.0597 97.8202 93.4975 96.83C92.7798 95.6853 92.4694 94.3322 92.6165 92.9895ZM101.15 92.6692C101.264 91.8189 101.173 90.9538 100.884 90.1458C100.617 89.8971 100.269 89.757 99.9043 89.7466C99.5396 89.7361 99.1836 89.8589 98.9031 90.0919C98.5985 90.8753 98.4816 91.7189 98.5616 92.5555C98.5616 94.4323 98.6514 94.7556 99.2087 95.1358C99.7661 95.5159 99.9429 95.5339 100.47 95.1926C100.947 94.8694 101.094 94.4294 101.15 92.6692ZM107.356 88.1791C106.212 88.3558 105.358 89.4394 105.04 91.1725C104.325 93.9143 104.659 96.8241 105.978 99.3325C107.21 100.653 107.857 99.8024 106.949 98.0723C106.326 95.5474 106.337 92.9082 106.979 90.3883C107.116 90.1963 107.296 90.0381 107.503 89.9255C107.711 89.813 107.941 89.7491 108.177 89.7387C108.416 89.7302 108.653 89.7765 108.871 89.8741C109.089 89.9717 109.281 90.1179 109.433 90.3014C109.675 91.606 109.775 92.9327 109.733 94.2587C109.733 96.839 109.643 97.7191 109.295 98.0693C108.738 98.5961 108.696 100.003 109.238 100.003C109.856 100.003 110.883 98.7428 111.204 97.6233C111.623 95.0563 111.584 92.4355 111.087 89.8824C110.769 89.2026 110.219 88.658 109.535 88.346C108.852 88.034 108.08 87.9748 107.356 88.1791ZM115.299 90.3439C115.096 89.7215 115.037 89.0611 115.126 88.4126L115.129 88.4006C115.23 88.2581 115.365 88.1436 115.523 88.0681C115.68 87.9927 115.854 87.9588 116.028 87.9696C116.673 87.9696 116.762 88.0893 116.762 89.0263C116.762 89.8764 117.062 90.4391 118.084 91.6365C118.723 92.2092 119.226 92.9174 119.557 93.7092C119.887 94.5011 120.036 95.3566 119.993 96.2134C119.993 98.7997 118.935 99.997 116.676 99.997C116.117 99.9769 115.57 99.8242 115.082 99.5515C114.594 99.2787 114.178 98.8938 113.868 98.4285C113.558 97.9636 113.363 97.4318 113.3 96.877C113.236 96.3222 113.306 95.7603 113.502 95.2375C113.916 93.9174 114.206 93.7109 115 94.121C115.477 94.3844 115.534 94.564 115.3 95.0011C114.536 96.4229 115.378 98.5183 116.739 98.5183C117.736 98.5183 118.237 97.7011 118.237 96.0847C118.237 94.4682 117.976 93.9115 116.301 92.0047C115.845 91.5341 115.503 90.9662 115.299 90.3439Z"
                    />
                  </svg>
                </a>
              </div>
              <Caption className="text-[--tg-theme-hint-color]">
                © SS.ge ყველა უფლება დაცულია
              </Caption>
            </SectionFooter>
          </List>
          <FixedLayout className="z-[1]">
            <Divider />
            <div className="p-5 bg-[--tg-theme-header-bg-color]">
              <Button
                type="submit"
                onClick={() => {
                  hapticFeedback.impactOccurred("soft");
                }}
                size="l"
                stretched
              >
                გაგზავნა
              </Button>
            </div>
          </FixedLayout>
        </form>
      </Fragment>
    </SDKProvider>
  );
}
