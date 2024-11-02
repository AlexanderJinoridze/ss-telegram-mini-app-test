"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  FixedLayout,
  Button,
  Divider,
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

  const dealTypeMap = [
    { id: 1, label: "ქირავდება" },
    { id: 2, label: "იყიდება" },
    { id: 3, label: "გირავდება" },
    { id: 4, label: "ქირავდება დღიურად" },
  ];

  const propertyTypeMap = [
    { id: 1, label: "კერძო სახლი", iconName: "home" },
    { id: 2, label: "ბინა", iconName: "chair" },
    { id: 3, label: "მიწა", iconName: "psychiatry" },
    { id: 4, label: "კომერციული", iconName: "home_work" },
    { id: 5, label: "სასტუმრო", iconName: "hotel" },
    { id: 6, label: "აგარაკი", iconName: "cabin" },
  ];

  const dealTypeChange = () => {
    setDealTypeShadow(dealType);
    setDealTypeLabelShadow(dealTypeLabel);
  };

  const propertyTypeChange = () => {
    setPropertyTypeShadow(propertyType);
    setPropertyTypeLabelShadow(propertyTypeLabel);
  };

  const dealTypeClear = () => {
    setDealTypeShadow(undefined);
    setDealTypeLabelShadow(undefined);
  };

  const propertyTypeClear = () => {
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
    setPropertyType(propertyTypeShadow);
    setPropertyTypeLabel(propertyTypeLabelShadow);
  };

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <List>
          <SectionHeader large>SS.GE</SectionHeader>
          <Section className="pb-[66px] !mb-0">
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
                </Cell>
              }
              onOpenChange={propertyTypeChange}
            >
              <ModalHeader title="ქონების ტიპი" onClear={propertyTypeClear} />
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
          <FixedLayout className="!p-0">
            <div className="p-5 bg-[--tg-theme-secondary-bg-color]">
              <Button size="l" stretched>
                იპოვე
              </Button>
            </div>
          </FixedLayout>
        </List>
      </Fragment>
    </SDKProvider>
  );
}
