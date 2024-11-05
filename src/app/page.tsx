"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  FixedLayout,
  Button,
  Divider,
  Subheadline,
  Text,
  Input,
} from "@telegram-apps/telegram-ui";
import { Fragment, useEffect, useState } from "react";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider, useHapticFeedback } from "@telegram-apps/sdk-react";
import { ModalHeader as ModalCap } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import ModalFooter from "@/components/ModalFooter";
import ModalHeader from "@/components/ModalHeader";
import useViewportSize from "@/hooks/useViewportSize";

export default function Home() {
  const [dealType, setDealType] = useState<number | undefined>(undefined);
  const [dealTypeShadow, setDealTypeShadow] = useState<number | undefined>();
  const [dealTypeLabelShadow, setDealTypeLabelShadow] = useState<string>();
  const [dealTypeLabel, setDealTypeLabel] = useState<string>();
  const [propertyType, setPropertyType] = useState<number | undefined>(
    undefined
  );
  const [propertyTypeShadow, setPropertyTypeShadow] = useState<
    number | undefined
  >();
  const [propertyTypeLabelShadow, setPropertyTypeLabelShadow] =
    useState<string>();
  const [propertyTypeLabel, setPropertyTypeLabel] = useState<string>();
  const [statusesShadow, setStatusesShadow] = useState<number[]>([]);
  const [statuses, setStatuses] = useState<number[]>([]);
  const [statusesLabelShadow, setStatusesLabelShadow] = useState<string[]>([]);
  const [statusesLabel, setStatusesLabel] = useState<string[]>([]);

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
      { id: 31, label: "კომერციული ფართი" },
      { id: 6, label: "სასაწყობე / საწარმოო ფართი" },
      { id: 7, label: "საოფისე ფართი" },
    ],
    6: [
      { id: 2, label: "ახალი აშენებული" },
      { id: 3, label: "მშენებარე" },
      { id: 453, label: "ძველი აშენებული" },
    ],
  };

  const dealTypeChange = () => {
    setDealTypeShadow(dealType);
    setDealTypeLabelShadow(dealTypeLabel);
  };

  const propertyTypeChange = () => {
    setStatusesShadow([...statuses]);
    setStatusesLabelShadow([...statusesLabel]);
    setPropertyTypeShadow(propertyType);
    setPropertyTypeLabelShadow(propertyTypeLabel);
  };

  const dealTypeClear = () => {
    setDealTypeShadow(undefined);
    setDealTypeLabelShadow(undefined);
  };

  const propertyTypeClear = () => {
    setStatusesShadow([]);
    setStatusesLabelShadow([]);
    setPropertyTypeShadow(undefined);
    setPropertyTypeLabelShadow(undefined);
  };

  const dealTypeOptionSelect = ({
    id,
    label,
  }: {
    id: number;
    label: string;
  }) => {
    if (id === dealTypeShadow) {
      setDealTypeShadow(undefined);
      setDealTypeLabelShadow(undefined);
    } else {
      setDealTypeShadow(id);
      setDealTypeLabelShadow(label);
    }
  };

  const propertyTypeOptionSelect = ({
    id,
    label,
  }: {
    id: number;
    label: string;
  }) => {
    setStatusesShadow([]);
    setStatusesLabelShadow([]);
    if (id === propertyTypeShadow) {
      setPropertyTypeShadow(undefined);
      setPropertyTypeLabelShadow(undefined);
    } else {
      setPropertyTypeShadow(id);
      setPropertyTypeLabelShadow(label);
    }
  };

  const dealTypeChoose = () => {
    setDealType(dealTypeShadow);
    setDealTypeLabel(dealTypeLabelShadow);
  };

  const propertyTypeChoose = () => {
    setStatuses(statusesShadow);
    setStatusesLabel(statusesLabelShadow);
    setPropertyType(propertyTypeShadow);
    setPropertyTypeLabel(propertyTypeLabelShadow);
  };

  const normalizedStatusLabels = statusesLabel
    .filter((elem) => elem !== "კომერციული ფართი")
    .join(", ");

  const viewport = useViewportSize();

  useEffect(() => {
    document.body.style.height = viewport?.[1] ? `${viewport[1]}px` : "100%";
  }, [viewport]);

  const hapticFeedback = useHapticFeedback();

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <div className="h-screen flex flex-col">
          <List className="w-full absolute overflow-auto flex-grow !mb-[90px] py-0">
            <SectionHeader
              large
              className="flex !m-0 !py-8 flex-col items-center"
            >
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
                  // className="fill-[--tg-theme-text-color]"
                  className="fill-[--tg-theme-accent-text-color]"
                  d="M8.92417 8H34.0758C34.5828 7.98906 35.0662 7.77483 35.4248 7.4021C35.7834 7.02938 35.9895 6.527 36 6C36 5.46957 35.7973 4.96086 35.4364 4.58579C35.0756 4.21071 34.5862 4 34.0758 4H8.92417C8.41385 4 7.92443 4.21071 7.56358 4.58579C7.20272 4.96086 7 5.46957 7 6C7 6.53043 7.20272 7.03914 7.56358 7.41421C7.92443 7.78929 8.41385 8 8.92417 8ZM66.154 28.6321H62.4847C61.1903 28.5946 59.8949 28.663 58.6116 28.8368C58.1359 28.8368 58 28.9732 58 29.4508V30.8152C58 31.2927 58.1359 31.4291 58.6116 31.4974C59.359 31.6338 60.1064 31.702 60.8539 31.7702L60.8539 31.7702C62.9965 32.0209 65.158 32.0666 67.3092 31.9067C68.2595 31.8636 69.1983 31.6797 70.0951 31.3609C70.8936 31.1216 71.5978 30.638 72.1094 29.9776C72.621 29.3172 72.9145 28.513 72.949 27.6771C73.017 26.7687 73.017 25.8566 72.949 24.9483C72.8605 23.8047 72.352 22.7349 71.5221 21.9466C70.9978 21.4358 70.3728 21.0408 69.6874 20.7869C69.0419 20.5481 68.4133 20.2923 67.7848 20.0364C67.1563 19.7806 66.5277 19.5248 65.8822 19.286C64.9989 18.9449 64.1835 18.6038 63.3001 18.1945C62.9632 18.0845 62.6607 17.8882 62.4224 17.625C62.1841 17.3618 62.0182 17.0408 61.9411 16.6937C61.829 16.2946 61.7831 15.8798 61.8052 15.4657C61.7607 14.9791 61.9057 14.4941 62.2098 14.1124C62.5138 13.7308 62.9533 13.4824 63.436 13.4191C63.9922 13.2839 64.5625 13.2152 65.1348 13.2145H71.3182C71.7939 13.2145 71.8618 13.078 71.8618 12.6005V11.0997C71.8618 10.6903 71.7939 10.5539 71.3862 10.4857C69.5471 10.1575 67.6821 9.99767 65.8143 10.0081C64.3943 9.96061 62.975 10.1215 61.6014 10.4857C60.7759 10.6521 60.021 11.0681 59.438 11.6778C58.8549 12.2876 58.4717 13.0619 58.3398 13.8967C58.1585 15.1199 58.1814 16.3649 58.4077 17.5805C58.4926 18.3591 58.8012 19.096 59.2959 19.7016C59.7905 20.3072 60.4499 20.7554 61.1937 20.9915C62.9604 21.6737 64.6591 22.3559 66.3579 23.0381C66.9933 23.2536 67.6074 23.5276 68.1925 23.8568C68.4962 24.016 68.755 24.2494 68.945 24.5356C69.135 24.8218 69.2501 25.1514 69.2797 25.494C69.3384 25.8547 69.3611 26.2203 69.3477 26.5855C69.3541 26.982 69.2315 27.3697 68.9985 27.6898C68.7655 28.0099 68.4348 28.245 68.0566 28.3593C67.4417 28.5546 66.7989 28.6468 66.154 28.6321ZM92.2003 28.9576C92.073 29.202 92.0043 29.4756 92 29.7546C92 31.0168 92.4648 31.648 93.328 31.9285C93.9591 32.084 94.6225 31.9839 95.1871 31.648C95.5167 31.4025 95.7647 31.0535 95.8958 30.6507C96.0269 30.2478 96.0345 29.8116 95.9175 29.4039C95.8727 29.0505 95.7075 28.7263 95.4527 28.4923C95.0586 28.1977 94.5931 28.028 94.1109 28.0032C93.6287 27.9783 93.1497 28.0994 92.7304 28.3521C92.5096 28.5052 92.3276 28.7131 92.2003 28.9576ZM79.7112 28.6723H83.2782C83.9169 28.6871 84.5536 28.5947 85.1626 28.3988C85.5108 28.3054 85.8214 28.1034 86.0508 27.8214C86.2802 27.5394 86.4167 27.1914 86.4414 26.8264C86.4539 26.3013 86.4314 25.776 86.3741 25.254C86.3206 24.9626 86.2017 24.6876 86.0266 24.4505C85.8515 24.2133 85.625 24.0204 85.3645 23.8866C84.8392 23.6079 84.3001 23.3569 83.7493 23.1346C81.9994 22.3826 80.2496 21.6989 78.4324 21.0152C77.6999 20.7602 77.0497 20.3072 76.5517 19.7049C76.0536 19.1026 75.7266 18.3738 75.6057 17.5969C75.3816 16.3786 75.3588 15.1309 75.5384 13.9051C75.6691 13.0685 76.0487 12.2925 76.6261 11.6815C77.2036 11.0704 77.9514 10.6535 78.7689 10.4867C80.1753 10.1216 81.6255 9.96049 83.0763 10.0082C84.8817 9.99773 86.6842 10.1579 88.4604 10.4867C88.8643 10.5551 88.9989 10.6918 88.9989 11.102V12.6745C88.9989 13.0847 88.8643 13.2214 88.4604 13.2214H82.2686C81.7018 13.2221 81.137 13.291 80.5861 13.4265C80.108 13.4899 79.6727 13.7389 79.3715 14.1213C79.0704 14.5038 78.9267 14.9898 78.9708 15.4775C78.9338 16.0101 79.0024 16.5448 79.1727 17.05C79.4341 17.5665 79.8616 17.9767 80.3842 18.2122C80.8216 18.4173 81.2759 18.6053 81.7302 18.7933C82.1845 18.9813 82.6388 19.1693 83.0763 19.3744C83.5785 19.5728 84.0808 19.783 84.5879 19.9952C85.3038 20.2948 86.0293 20.5983 86.7779 20.8785C87.5173 21.1549 88.1849 21.5992 88.7296 22.1775C89.3605 22.8523 89.7615 23.715 89.8738 24.6387C90.0421 25.7259 90.0421 26.8331 89.8738 27.9203C89.7854 28.7092 89.4701 29.4541 88.9674 30.062C88.4647 30.67 87.7968 31.114 87.0471 31.3386C85.9853 31.714 84.8731 31.9215 83.7493 31.9539C81.5264 32.0564 79.2991 31.9879 77.0864 31.7488L75.5384 31.5437C75.1346 31.4754 75 31.3386 75 30.9284V29.4243C75 29.0141 75.1346 28.8774 75.5384 28.8774C76.923 28.7116 78.3173 28.643 79.7112 28.6723ZM106.206 31.5269L108.708 31.3276V32.2575C108.695 32.604 108.591 32.9408 108.406 33.2328C108.221 33.5248 107.961 33.7614 107.654 33.9179C107.4 34.0154 107.134 34.0823 106.864 34.1172C106.319 34.1944 105.769 34.2388 105.218 34.25H101.268C100.807 34.25 100.741 34.3828 100.741 34.7813V36.1097C100.741 36.5082 100.873 36.641 101.333 36.7074C102.198 36.832 103.12 36.8982 103.992 36.9607L104.165 36.9731C105.64 37.0503 107.12 36.9612 108.576 36.7074C109.463 36.5597 110.275 36.1152 110.881 35.4455C111.44 34.7982 111.765 33.9787 111.802 33.1209C111.936 32.1526 112.002 31.1761 112 30.1985V17.1143C112 16.7158 111.868 16.583 111.473 16.5166C111.144 16.4723 110.815 16.4206 110.486 16.369C109.827 16.2657 109.169 16.1623 108.51 16.1181C106.736 15.9409 104.947 15.9632 103.177 16.1845C102.489 16.305 101.824 16.5289 101.202 16.8487C100.717 17.1559 100.301 17.5634 99.9837 18.0442C99.6659 18.525 99.4527 19.0682 99.3581 19.6382C99.1509 20.6883 99.0407 21.7556 99.0289 22.8262C98.9416 24.516 99.0521 26.2103 99.3581 27.8739C99.7532 29.8 100.807 30.9956 102.782 31.3276C103.912 31.5262 105.061 31.5931 106.206 31.5269ZM105.877 18.9076H108.708H108.774V28.4053L108.607 28.4207C107.947 28.4816 107.335 28.5381 106.667 28.5381C105.942 28.5381 105.218 28.5381 104.494 28.4717C103.978 28.4474 103.489 28.2297 103.124 27.8612C102.758 27.4926 102.543 26.9998 102.519 26.4792C102.311 24.9831 102.266 23.4686 102.387 21.9628C102.394 21.6049 102.438 21.2488 102.519 20.9001C102.545 20.3865 102.764 19.9022 103.13 19.5448C103.497 19.1874 103.984 18.9834 104.494 18.974C104.953 18.9188 105.415 18.8966 105.877 18.9076ZM118.418 25.3036C118.404 26.0241 118.494 26.7428 118.686 27.436C118.806 27.8448 119.042 28.2074 119.365 28.4771C119.687 28.7468 120.081 28.9113 120.495 28.9494C120.872 29.0046 121.253 29.0276 121.634 29.0182H126.459C126.928 29.0182 126.995 29.087 126.995 29.5685V31.0818C127.004 31.1542 127 31.2277 126.981 31.2982C126.962 31.3686 126.93 31.4346 126.887 31.4922C126.843 31.5498 126.789 31.5979 126.727 31.6338C126.665 31.6696 126.596 31.6924 126.526 31.7009C124.283 32.0111 122.015 32.0802 119.758 31.9073C119.024 31.8533 118.302 31.6911 117.614 31.4258C117.089 31.1815 116.624 30.8201 116.254 30.3678C115.883 29.9156 115.615 29.3839 115.469 28.8118C115.149 27.5311 114.991 26.2132 115 24.8909C115 23.6463 115.061 22.4641 115.125 21.2255V21.2254V21.2253V21.2252V21.2251V21.225L115.134 21.0387C115.187 20.2633 115.345 19.4992 115.603 18.7687C115.825 18.1615 116.194 17.622 116.675 17.2009C117.155 16.7798 117.732 16.4909 118.351 16.3611C120.402 15.8796 122.532 15.8796 124.583 16.3611C125.294 16.4982 125.951 16.8441 126.474 17.3569C126.997 17.8698 127.364 18.5274 127.531 19.2502C127.823 20.3495 127.98 21.4817 128 22.6208V24.6845C127.933 25.166 127.799 25.3036 127.33 25.3724H118.418V25.3036ZM118.418 22.8272H124.784C124.831 22.0148 124.74 21.2001 124.516 20.4196C124.411 20.0954 124.227 19.8046 123.98 19.5755C123.733 19.3464 123.433 19.1869 123.108 19.1126C122.042 18.8829 120.936 18.9302 119.892 19.2502C119.667 19.3064 119.459 19.4169 119.284 19.5724C119.109 19.7279 118.973 19.924 118.887 20.1444C118.51 20.8085 118.479 21.517 118.447 22.27C118.439 22.4531 118.431 22.6388 118.418 22.8272ZM22.1176 16H1.88235C1.38312 16 0.904338 15.7893 0.551328 15.4142C0.198319 15.0391 0 14.5304 0 14C0 13.4696 0.198319 12.9609 0.551328 12.5858C0.904338 12.2107 1.38312 12 1.88235 12H22.1176C22.6169 12 23.0957 12.2107 23.4487 12.5858C23.8017 12.9609 24 13.4696 24 14C24 14.5304 23.8017 15.0391 23.4487 15.4142C23.0957 15.7893 22.6169 16 22.1176 16ZM8.92417 24H34.0758C34.5829 23.9891 35.0662 23.7748 35.4248 23.4021C35.7834 23.0294 35.9895 22.527 36 22C36 21.4696 35.7973 20.9609 35.4364 20.5858C35.0756 20.2107 34.5862 20 34.0758 20H8.92417C8.41385 20 7.92443 20.2107 7.56358 20.5858C7.20272 20.9609 7 21.4696 7 22C7 22.5304 7.20272 23.0391 7.56358 23.4142C7.92443 23.7893 8.41385 24 8.92417 24ZM41.1839 32H20.8823C20.3831 32 19.9043 31.7893 19.5513 31.4142C19.1983 31.0391 19 30.5304 19 30C19 29.4696 19.1983 28.9609 19.5513 28.5858C19.9043 28.2107 20.3831 28 20.8823 28H41.1167C41.6159 28 42.0947 28.2107 42.4477 28.5858C42.8007 28.9609 42.999 29.4696 42.999 30C43.0071 30.259 42.9662 30.517 42.8787 30.7589C42.7912 31.0007 42.6589 31.2214 42.4896 31.4079C42.3204 31.5945 42.1176 31.743 41.8933 31.8447C41.669 31.9464 41.4278 31.9992 41.1839 32ZM8.92417 40H34.0758C34.5791 39.9773 35.0559 39.7592 35.4122 39.389C35.7684 39.0187 35.9781 38.5231 36 38C36 37.4696 35.7973 36.9609 35.4364 36.5858C35.0756 36.2107 34.5862 36 34.0758 36H8.92417C8.41385 36 7.92443 36.2107 7.56358 36.5858C7.20272 36.9609 7 37.4696 7 38C7 38.5304 7.20272 39.0391 7.56358 39.4142C7.92443 39.7893 8.41385 40 8.92417 40Z"
                />
              </svg>
            </SectionHeader>
            <Section>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.selectionChanged();
                    }}
                  >
                    {dealType === undefined ? (
                      "გარიგების ტიპი"
                    ) : (
                      <Text weight="2">{dealTypeLabel}</Text>
                    )}
                  </Cell>
                }
                onOpenChange={dealTypeChange}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader title="გარიგების ტიპი" onClear={dealTypeClear} />
                {dealTypeMap.map((item) => (
                  <Cell
                    key={item.id}
                    className={`px-6 transition-colors hover:bg-transparent ${
                      item.id === dealTypeShadow
                        ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                        : "bg-transparent"
                    }`}
                    after={
                      item.id === dealTypeShadow ? (
                        <span className="material-symbols-outlined">check</span>
                      ) : null
                    }
                    onClick={() => dealTypeOptionSelect(item)}
                  >
                    {item.label}
                  </Cell>
                ))}
                <ModalFooter onClick={dealTypeChoose} />
              </Modal>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("heavy");
                    }}
                  >
                    {propertyType === undefined ? (
                      "ქონების ტიპი"
                    ) : (
                      <Text weight="2">{propertyTypeLabel}</Text>
                    )}
                    <>
                      {normalizedStatusLabels ? (
                        <Text weight="2"> - {normalizedStatusLabels}</Text>
                      ) : null}
                    </>
                  </Cell>
                }
                onOpenChange={propertyTypeChange}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader title="ქონების ტიპი" onClear={propertyTypeClear} />
                {propertyTypeShadow !== undefined &&
                propertyTypeStatusMap[propertyTypeShadow] !== undefined ? (
                  <div className="p-6 pt-2">
                    <Subheadline plain weight="2">
                      სტატუსი
                    </Subheadline>
                    <div className="flex flex-wrap gap-3 mt-4">
                      {propertyTypeStatusMap[propertyTypeShadow].map(
                        ({ id, label }) => (
                          <Button
                            key={id}
                            size="m"
                            mode={
                              statusesShadow.includes(id) ? "filled" : "outline"
                            }
                            className="flex-shrink-0"
                            onClick={() => {
                              if (statusesShadow.includes(id)) {
                                statusesShadow.splice(
                                  statusesShadow.indexOf(id),
                                  1
                                );
                                statusesLabelShadow.splice(
                                  statusesLabelShadow.indexOf(label),
                                  1
                                );
                                setStatusesShadow([...statusesShadow]);
                                setStatusesLabelShadow([
                                  ...statusesLabelShadow,
                                ]);
                              } else {
                                setStatusesShadow([...statusesShadow, id]);
                                setStatusesLabelShadow([
                                  ...statusesLabelShadow,
                                  label,
                                ]);
                              }
                            }}
                          >
                            <Text weight="3">{label}</Text>
                          </Button>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
                {propertyTypeMap.map((item) => (
                  <Cell
                    key={item.id}
                    className={`px-6 transition-colors hover:bg-transparent ${
                      item.id === propertyTypeShadow
                        ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                        : "bg-transparent"
                    }`}
                    before={
                      <span
                        className="material-symbols-outlined"
                        style={{
                          fontVariationSettings:
                            item.id === propertyTypeShadow
                              ? '"FILL" 1'
                              : undefined,
                        }}
                      >
                        {item.iconName}
                      </span>
                    }
                    after={
                      item.id === propertyTypeShadow ? (
                        <span className="material-symbols-outlined">check</span>
                      ) : null
                    }
                    onClick={() => propertyTypeOptionSelect(item)}
                  >
                    {item.label}
                  </Cell>
                ))}
                <ModalFooter onClick={propertyTypeChoose} />
              </Modal>
              <Cell
                onClick={() => {
                  hapticFeedback.impactOccurred("medium");
                }}
              >
                მდებარეობა
              </Cell>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell
                    onClick={() => {
                      hapticFeedback.impactOccurred("rigid");
                    }}
                  >
                    ფართი
                  </Cell>
                }
                onOpenChange={() => {
                  console.log("PRICE MODAL OPEN CHANGE");
                }}
                id="Zaza"
                className="h-full max-h-[400px]"
              >
                <ModalHeader title="ფართი" onClear={propertyTypeClear} />
                <div>
                  <div className="[&>div]:px-6">
                    <Input
                      header="-დან"
                      after="მ²"
                      onFocus={() => {
                        document.getElementById("Zaza")?.classList.add("AAA");
                      }}
                      onBlur={() => {
                        document
                          .getElementById("Zaza")
                          ?.classList.remove("AAA");
                      }}
                    />
                  </div>
                  <div className="[&>div]:px-6">
                    <Input
                      header="-მდე"
                      after="მ²"
                      onFocus={() => {
                        document.getElementById("Zaza")?.classList.add("BBB");
                      }}
                      onBlur={() => {
                        document
                          .getElementById("Zaza")
                          ?.classList.remove("BBB");
                      }}
                    />
                  </div>
                </div>
                <div className="p-6 pt-2">
                  <Subheadline plain weight="2">
                    ოთახები
                  </Subheadline>
                  <div className="flex flex-wrap gap-3 mt-4">
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">1</Text>
                    </Button>
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">2</Text>
                    </Button>
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">3</Text>
                    </Button>
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">4</Text>
                    </Button>
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">5</Text>
                    </Button>
                    <Button size="m" mode={"outline"} className="flex-shrink-0">
                      <Text weight="3">6+</Text>
                    </Button>
                  </div>
                </div>
                <ModalFooter
                  onClick={() => {
                    console.log("CHOOSE PRICE");
                  }}
                />
              </Modal>
              <Cell
                onClick={() => {
                  hapticFeedback.impactOccurred("light");
                }}
              >
                ფასი
              </Cell>
            </Section>
          </List>
          <FixedLayout>
            <Divider />
            <div className="p-5 bg-[--tg-theme-header-bg-color]">
              <Button
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
        </div>
      </Fragment>
    </SDKProvider>
  );
}
