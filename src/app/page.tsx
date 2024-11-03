"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  FixedLayout,
  Button,
  Divider,
  Chip,
  Subheadline,
  Text,
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

  const propertyTypeStatusMap: { [key in number]: string[] } = {
    1: ["ახალი აშენებული", "მშენებარე", "ძველი აშენებული"],
    2: ["ახალი აშენებული", "მშენებარე", "ძველი აშენებული"],
    4: [
      "კვების ობიექტი",
      "გარაჟი",
      "სარდაფი",
      "სავაჭრო ობიექტი",
      "კომერციული ფართი",
      "სასაწყობე / საწარმოო ფართი",
      "საოფისე ფართი",
    ],
    6: ["ახალი აშენებული", "მშენებარე", "ძველი აშენებული"],
  };

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
      label: "კომერციული",
      iconName: "home_work",
    },
    { id: 5, label: "სასტუმრო", iconName: "hotel" },
    {
      id: 6,
      label: "აგარაკი",
      iconName: "cabin",
    },
  ];

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
                    {dealType === undefined ? "გარიგების ტიპი" : dealTypeLabel}
                  </Cell>
                }
                onOpenChange={dealTypeChange}
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
                    {propertyType === undefined
                      ? "ქონების ტიპი"
                      : propertyTypeLabel}
                    <>
                      {statusesLabel.length ? (
                        <span> - {statusesLabel.join(", ")}</span>
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
                        (label, statusIndex) => (
                          <Button
                            key={label}
                            size="m"
                            mode={
                              statusesShadow.includes(statusIndex)
                                ? "filled"
                                : "outline"
                            }
                            className="flex-shrink-0"
                            onClick={() => {
                              if (statusesShadow.includes(statusIndex)) {
                                statusesShadow.splice(
                                  statusesShadow.indexOf(statusIndex),
                                  1
                                );
                                statusesLabelShadow.splice(
                                  statusesLabelShadow.indexOf(label),
                                  1
                                );
                                setStatusesShadow([...statusesShadow]);
                                setStatusesLabelShadow([...statusesLabelShadow]);
                              } else {
                                setStatusesShadow([
                                  ...statusesShadow,
                                  statusIndex,
                                ]);
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
              <Cell>ფართი</Cell>
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
