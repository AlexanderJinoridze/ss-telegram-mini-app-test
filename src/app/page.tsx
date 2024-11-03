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

import { Fragment, useState } from "react";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider } from "@telegram-apps/sdk-react";
import { ModalHeader as ModalCap } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import ModalFooter from "@/components/ModalFooter";
import ModalHeader from "@/components/ModalHeader";

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

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <div className="h-screen flex flex-col">
          <List className="overflow-auto flex-grow mb-[90px]">
            <SectionHeader large>SS.GE</SectionHeader>
            <Section>
              <Modal
                header={<ModalCap />}
                trigger={
                  <Cell>
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
                  <Cell>
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

              <Cell>მდებარეობა</Cell>
              <Modal
                header={<ModalCap />}
                trigger={<Cell>ფართი</Cell>}
                onOpenChange={() => {
                  console.log("PRICE MODAL OPEN CHANGE");
                }}
                className="max-h-[calc(100%-1.5rem)]"
              >
                <ModalHeader title="ფართი" onClear={propertyTypeClear} />
                <Input placeholder="დან" after="მ²" />

                <Input placeholder="მდე" after="მ²" />

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
              <Cell>ფასი</Cell>
            </Section>
          </List>
          <FixedLayout>
            <Divider />
            <div className="p-5 bg-[--tg-theme-header-bg-color]">
              <Button size="l" stretched>
                გაგზავნა
              </Button>
            </div>
          </FixedLayout>
        </div>
      </Fragment>
    </SDKProvider>
  );
}
