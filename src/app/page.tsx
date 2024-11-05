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

  // const viewport = useViewportSize();

  // useEffect(() => {
  //   document.body.style.height = viewport?.[1] ? `${viewport[1]}px` : "100%";
  // }, [viewport]);

  const hapticFeedback = useHapticFeedback();

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <div className="h-screen flex flex-col">
          <List className="overflow-auto flex-grow mb-[90px]">
            <SectionHeader large className="flex !m-0 py-8 flex-col items-center">
              <svg
                width="128"
                height="36"
                viewBox="0 0 128 36"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  className="fill-[--tgui--button_text_color]"
                  d="M8.92417 4H34.0758C34.5829 3.98906 35.0662 3.77483 35.4248 3.4021C35.7834 3.02938 35.9895 2.527 36 2C36 1.46957 35.7973 0.96086 35.4364 0.585787C35.0756 0.210714 34.5862 0 34.0758 0H8.92417C8.41385 0 7.92443 0.210714 7.56358 0.585787C7.20272 0.96086 7 1.46957 7 2C7 2.53043 7.20272 3.03914 7.56358 3.41421C7.92443 3.78929 8.41385 4 8.92417 4ZM66.154 24.6321H62.4847C61.1903 24.5946 59.8949 24.663 58.6116 24.8368C58.1359 24.8368 58 24.9732 58 25.4508V26.8152C58 27.2927 58.1359 27.4291 58.6116 27.4974C59.359 27.6338 60.1064 27.702 60.8539 27.7702L60.8539 27.7702C62.9965 28.0209 65.158 28.0666 67.3092 27.9067C68.2595 27.8636 69.1983 27.6797 70.0951 27.3609C70.8936 27.1216 71.5978 26.638 72.1094 25.9776C72.621 25.3172 72.9145 24.513 72.949 23.6771C73.017 22.7687 73.017 21.8566 72.949 20.9483C72.8605 19.8047 72.352 18.7349 71.5221 17.9466C70.9978 17.4358 70.3728 17.0408 69.6874 16.7869C69.0419 16.5481 68.4134 16.2923 67.7849 16.0365L67.7848 16.0364C67.1562 15.7806 66.5277 15.5248 65.8822 15.286C64.9989 14.9449 64.1835 14.6038 63.3001 14.1945C62.9632 14.0845 62.6607 13.8882 62.4224 13.625C62.1841 13.3618 62.0182 13.0408 61.9411 12.6937C61.829 12.2946 61.7831 11.8798 61.8052 11.4657C61.7607 10.9791 61.9057 10.4941 62.2098 10.1124C62.5138 9.73085 62.9533 9.48235 63.436 9.41913C63.9922 9.28389 64.5625 9.2152 65.1348 9.21447H71.3182C71.7939 9.21447 71.8618 9.07803 71.8618 8.60049V7.09965C71.8618 6.69033 71.7939 6.55389 71.3862 6.48567C69.5471 6.1575 67.6821 5.99767 65.8143 6.00814C64.3943 5.96061 62.975 6.12149 61.6014 6.48567C60.7759 6.65208 60.021 7.06809 59.438 7.67784C58.8549 8.28759 58.4717 9.06186 58.3398 9.89666C58.1585 11.1199 58.1814 12.3649 58.4077 13.5805C58.4926 14.3591 58.8012 15.096 59.2959 15.7016C59.7905 16.3072 60.4499 16.7554 61.1937 16.9915C62.9604 17.6737 64.6591 18.3559 66.3579 19.0381C66.9933 19.2536 67.6074 19.5276 68.1925 19.8568C68.4962 20.016 68.755 20.2494 68.945 20.5356C69.135 20.8218 69.2501 21.1514 69.2797 21.494C69.3384 21.8547 69.3611 22.2203 69.3477 22.5855C69.3541 22.982 69.2315 23.3697 68.9985 23.6898C68.7655 24.0099 68.4348 24.245 68.0566 24.3593C67.4417 24.5546 66.7989 24.6468 66.154 24.6321ZM92.2003 24.9576C92.073 25.202 92.0043 25.4756 92 25.7546C92 27.0168 92.4648 27.648 93.328 27.9285C93.9591 28.084 94.6225 27.9839 95.1871 27.648C95.5167 27.4025 95.7647 27.0535 95.8958 26.6507C96.0269 26.2478 96.0345 25.8116 95.9175 25.4039C95.8727 25.0505 95.7075 24.7263 95.4527 24.4923C95.0586 24.1977 94.5931 24.028 94.1109 24.0032C93.6287 23.9783 93.1497 24.0994 92.7304 24.3521C92.5096 24.5052 92.3276 24.7131 92.2003 24.9576ZM79.7112 24.6723H83.2782C83.9169 24.6871 84.5536 24.5947 85.1626 24.3988C85.5108 24.3054 85.8214 24.1034 86.0508 23.8214C86.2801 23.5394 86.4167 23.1914 86.4414 22.8264C86.4539 22.3013 86.4314 21.776 86.3741 21.254C86.3206 20.9626 86.2017 20.6876 86.0266 20.4505C85.8515 20.2133 85.625 20.0204 85.3645 19.8866C84.8392 19.6079 84.3001 19.3569 83.7493 19.1346C81.9994 18.3826 80.2496 17.6989 78.4324 17.0152C77.6999 16.7602 77.0497 16.3072 76.5517 15.7049C76.0536 15.1026 75.7266 14.3738 75.6057 13.5969C75.3816 12.3786 75.3588 11.1309 75.5384 9.90508C75.6691 9.06848 76.0487 8.29254 76.6261 7.68148C77.2036 7.07042 77.9514 6.6535 78.7689 6.48674C80.1753 6.12161 81.6255 5.96049 83.0763 6.00817C84.8817 5.99773 86.6842 6.15794 88.4604 6.48674C88.8643 6.55511 88.9989 6.69184 88.9989 7.10204V8.67448C88.9989 9.08468 88.8643 9.22141 88.4604 9.22141H82.2686C81.7018 9.22215 81.137 9.29099 80.5861 9.42652C80.108 9.48988 79.6727 9.73891 79.3715 10.1213C79.0704 10.5038 78.9267 10.9898 78.9708 11.4775C78.9338 12.0101 79.0024 12.5448 79.1727 13.05C79.4341 13.5665 79.8616 13.9767 80.3842 14.2122C80.8216 14.4173 81.2759 14.6053 81.7302 14.7933C82.1845 14.9813 82.6388 15.1693 83.0763 15.3744C83.5785 15.5728 84.0808 15.783 84.5879 15.9952C85.3038 16.2948 86.0293 16.5983 86.7779 16.8785C87.5173 17.1549 88.1849 17.5992 88.7296 18.1775C89.3605 18.8523 89.7615 19.715 89.8738 20.6387C90.0421 21.7259 90.0421 22.8331 89.8738 23.9203C89.7854 24.7092 89.4701 25.4541 88.9674 26.062C88.4647 26.67 87.7968 27.114 87.0471 27.3386C85.9853 27.714 84.8731 27.9215 83.7493 27.9539C81.5264 28.0564 79.2991 27.9879 77.0864 27.7488L75.5384 27.5437C75.1346 27.4754 75 27.3386 75 26.9284V25.4243C75 25.0141 75.1346 24.8774 75.5384 24.8774C76.923 24.7116 78.3173 24.643 79.7112 24.6723ZM106.206 27.5269L108.708 27.3276V28.2575C108.695 28.604 108.591 28.9408 108.406 29.2328C108.221 29.5248 107.961 29.7614 107.654 29.9179C107.4 30.0154 107.134 30.0823 106.864 30.1172C106.319 30.1944 105.769 30.2388 105.218 30.25H101.268C100.807 30.25 100.741 30.3828 100.741 30.7813V32.1097C100.741 32.5082 100.873 32.641 101.333 32.7074C102.198 32.832 103.12 32.8982 103.992 32.9607L103.992 32.9607L104.165 32.9731C105.64 33.0503 107.12 32.9612 108.576 32.7074C109.463 32.5597 110.275 32.1152 110.881 31.4455C111.44 30.7982 111.765 29.9787 111.802 29.1209C111.936 28.1526 112.002 27.1761 112 26.1985V13.1143C112 12.7158 111.868 12.583 111.473 12.5166C111.144 12.4723 110.815 12.4206 110.486 12.369C109.827 12.2657 109.169 12.1623 108.51 12.1181C106.736 11.9409 104.947 11.9632 103.177 12.1845C102.489 12.305 101.824 12.5289 101.202 12.8487C100.717 13.1559 100.301 13.5634 99.9837 14.0442C99.6659 14.525 99.4527 15.0682 99.3581 15.6382C99.1509 16.6883 99.0407 17.7556 99.0289 18.8262C98.9416 20.516 99.0521 22.2103 99.3581 23.8739C99.7532 25.8 100.807 26.9956 102.782 27.3276C103.912 27.5262 105.061 27.5931 106.206 27.5269ZM105.877 14.9076H108.708H108.774V24.4053L108.607 24.4207C107.947 24.4816 107.335 24.5381 106.667 24.5381C105.942 24.5381 105.218 24.5381 104.494 24.4717C103.978 24.4474 103.489 24.2297 103.124 23.8612C102.758 23.4926 102.543 22.9998 102.519 22.4792C102.311 20.9831 102.266 19.4686 102.387 17.9628C102.394 17.6049 102.438 17.2488 102.519 16.9001C102.545 16.3865 102.764 15.9022 103.13 15.5448C103.497 15.1874 103.984 14.9834 104.494 14.974C104.953 14.9188 105.415 14.8966 105.877 14.9076ZM118.418 21.3036C118.404 22.0241 118.494 22.7428 118.686 23.436C118.806 23.8448 119.042 24.2074 119.365 24.4771C119.687 24.7468 120.081 24.9113 120.495 24.9494C120.872 25.0046 121.253 25.0276 121.634 25.0182H126.459C126.928 25.0182 126.995 25.087 126.995 25.5685V27.0818C127.004 27.1542 127 27.2277 126.981 27.2982C126.962 27.3686 126.93 27.4346 126.887 27.4922C126.843 27.5498 126.789 27.5979 126.727 27.6338C126.665 27.6696 126.596 27.6924 126.526 27.7009C124.283 28.0111 122.015 28.0802 119.758 27.9073C119.024 27.8533 118.302 27.6911 117.614 27.4258C117.089 27.1815 116.624 26.8201 116.254 26.3678C115.883 25.9156 115.615 25.3839 115.469 24.8118C115.149 23.5311 114.991 22.2132 115 20.8908C115 19.6463 115.061 18.4641 115.125 17.2254V17.2254V17.2253V17.2252V17.225L115.134 17.0387C115.187 16.2633 115.345 15.4992 115.603 14.7687C115.825 14.1615 116.194 13.622 116.675 13.2009C117.155 12.7798 117.732 12.4909 118.351 12.3611C120.402 11.8796 122.532 11.8796 124.583 12.3611C125.294 12.4982 125.951 12.8441 126.474 13.3569C126.997 13.8698 127.364 14.5274 127.531 15.2502C127.823 16.3495 127.98 17.4817 128 18.6208V20.6845C127.933 21.166 127.799 21.3036 127.33 21.3724H118.418V21.3036ZM118.418 18.8272H124.784C124.831 18.0148 124.74 17.2001 124.516 16.4196C124.411 16.0954 124.227 15.8046 123.98 15.5755C123.733 15.3464 123.433 15.1869 123.108 15.1126C122.042 14.8829 120.936 14.9302 119.892 15.2502C119.667 15.3064 119.459 15.4169 119.284 15.5724C119.109 15.7279 118.973 15.924 118.887 16.1444C118.51 16.8085 118.479 17.517 118.447 18.27C118.439 18.4531 118.431 18.6388 118.418 18.8272ZM22.1176 12H1.88235C1.38312 12 0.904338 11.7893 0.551328 11.4142C0.198319 11.0391 0 10.5304 0 10C0 9.46957 0.198319 8.96086 0.551328 8.58579C0.904338 8.21071 1.38312 8 1.88235 8H22.1176C22.6169 8 23.0957 8.21071 23.4487 8.58579C23.8017 8.96086 24 9.46957 24 10C24 10.5304 23.8017 11.0391 23.4487 11.4142C23.0957 11.7893 22.6169 12 22.1176 12ZM8.92417 20H34.0758C34.5829 19.9891 35.0662 19.7748 35.4248 19.4021C35.7834 19.0294 35.9895 18.527 36 18C36 17.4696 35.7973 16.9609 35.4364 16.5858C35.0756 16.2107 34.5862 16 34.0758 16H8.92417C8.41385 16 7.92443 16.2107 7.56358 16.5858C7.20272 16.9609 7 17.4696 7 18C7 18.5304 7.20272 19.0391 7.56358 19.4142C7.92443 19.7893 8.41385 20 8.92417 20ZM41.1839 28H20.8823C20.3831 28 19.9043 27.7893 19.5513 27.4142C19.1983 27.0391 19 26.5304 19 26C19 25.4696 19.1983 24.9609 19.5513 24.5858C19.9043 24.2107 20.3831 24 20.8823 24H41.1167C41.6159 24 42.0947 24.2107 42.4477 24.5858C42.8007 24.9609 42.999 25.4696 42.999 26C43.0071 26.259 42.9662 26.517 42.8787 26.7589C42.7912 27.0007 42.6589 27.2214 42.4896 27.4079C42.3204 27.5945 42.1176 27.743 41.8933 27.8447C41.669 27.9464 41.4278 27.9992 41.1839 28ZM8.92417 36H34.0758C34.5791 35.9773 35.0559 35.7592 35.4122 35.389C35.7684 35.0187 35.9781 34.5231 36 34C36 33.4696 35.7973 32.9609 35.4364 32.5858C35.0756 32.2107 34.5862 32 34.0758 32H8.92417C8.41385 32 7.92443 32.2107 7.56358 32.5858C7.20272 32.9609 7 33.4696 7 34C7 34.5304 7.20272 35.0391 7.56358 35.4142C7.92443 35.7893 8.41385 36 8.92417 36Z"
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
