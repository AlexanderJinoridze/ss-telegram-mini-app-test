"use client";

import {
  Section,
  Cell,
  List,
  Modal,
  Button,
  IconButton,
  Headline,
} from "@telegram-apps/telegram-ui";

import { Fragment, useEffect, useState } from "react";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Script from "next/script";
import { SDKProvider, useMainButton } from "@telegram-apps/sdk-react";

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

  const [isDealTypeModalOpen, setIsDealTypeModalOpen] =
    useState<boolean>(false);

  const [showMainButton, setShowMainButton] = useState<boolean>(false);

  // const dealTypeButton = useMainButton();
  // const propertyTypeButton = useMainButton();
  const submitButton = useMainButton();

  // dealTypeButton.setText("არჩევა");
  // propertyTypeButton.setText("არჩევა");
  // submitButton.setText("ძაზა");

  // dealTypeButton.on("click", () => {
  //   // setIsDealTypeModalOpen(false);
  //   onSelect("dealType");
  // });

  // propertyTypeButton.on("click", () => {
  //   onSelect("propertyType");
  // });

  const dealTypeMap = [
    { id: 1, label: "ქირავდება" },
    { id: 2, label: "იყიდება" },
    { id: 3, label: "გირავდება" },
    { id: 4, label: "ქირავდება დღიურად" },
  ];

  const propertyTypeMap = [
    { id: 1, label: "კერძო სახლი" },
    { id: 2, label: "ბინა" },
    { id: 3, label: "მიწა" },
    { id: 4, label: "კომერციული" },
    { id: 5, label: "სასტუმრო" },
    { id: 6, label: "აგარაკი" },
  ];

  useEffect(() => {
    setShowMainButton(!!(dealType || propertyType));
  }, [dealType, propertyType]);

  const onOpenChange = (
    open: boolean,
    modalType: "dealType" | "propertyType"
  ) => {
    if (modalType === "dealType") {
      setDealTypeShadow(dealType);
      setDealTypeLabelShadow(dealTypeLabel);
    } else if (modalType === "propertyType") {
      setPropertyTypeShadow(propertyType);
      setPropertyTypeLabelShadow(propertyTypeLabel);
    }
  };

  const onClear = (modalType: "dealType" | "propertyType") => {
    if (modalType === "dealType") {
      setDealTypeShadow(undefined);
      setDealTypeLabelShadow(undefined);
    } else if (modalType === "propertyType") {
      setPropertyTypeShadow(undefined);
      setPropertyTypeLabelShadow(undefined);
    }
  };

  const onOptionSelect = (
    item: { id: number; label: string },
    modalType: "dealType" | "propertyType"
  ) => {
    if (modalType === "dealType") {
      if (item.id === dealTypeShadow) {
        setDealTypeShadow(undefined);
        setDealTypeLabelShadow(undefined);
      } else {
        setDealTypeShadow(item.id);
        setDealTypeLabelShadow(item.label);
      }
    } else if (modalType === "propertyType") {
      if (item.id === propertyTypeShadow) {
        setPropertyTypeShadow(undefined);
        setPropertyTypeLabelShadow(undefined);
      } else {
        setPropertyTypeShadow(item.id);
        setPropertyTypeLabelShadow(item.label);
      }
    }
  };

  const onSelect = (modalType: "dealType" | "propertyType") => {
    if (modalType === "dealType") {
      setDealType(dealTypeShadow);
      setDealTypeLabel(dealTypeLabelShadow);
    } else if (modalType === "propertyType") {
      setPropertyType(propertyTypeShadow);
      setPropertyTypeLabel(propertyTypeLabelShadow);
    }
  };

  const zaza = () => {
    onSelect("dealType");
  };

  const soso = () => {
    console.log("SUBMIT");
  };

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <List>
          <SectionHeader large>SS.GE</SectionHeader>
          <Section>
            <Modal
              header={<ModalHeader />}
              // open={isDealTypeModalOpen}
              trigger={
                <Cell>
                  {dealType === undefined ? "გარიგების ტიპი" : dealTypeLabel}
                </Cell>
              }
              onOpenChange={(open) => {
                if (open) {
                  submitButton
                    .setParams({
                      text: "არჩევა",
                      isVisible: open,
                    })
                    .on("click", zaza);
                } else {
                  if (!showMainButton) {
                    submitButton.hide();
                  }
                  submitButton
                  .setParams({
                    text: "გაგზავნა",
                    isVisible: open,
                  })
                  .on("click", soso);
                  // submitButton.setText("გაგზავნა");
                  // submitButton.off("click", soso);
                  // submitButton.on("click", soso);
                }
                // setIsDealTypeModalOpen(open);
                onOpenChange(open, "dealType");
              }}
            >
              <div className="flex justify-between items-center px-6 pb-6">
                <Headline plain weight="2" className="flex justify-between">
                  გარიგების ტიპი
                </Headline>
                <Button
                  size="s"
                  mode="bezeled"
                  className="flex-shrink-0"
                  onClick={() => onClear("dealType")}
                >
                  გასუფთავება
                </Button>
              </div>
              {dealTypeMap.map((item) => (
                <Cell
                  key={item.id}
                  className={`px-6 transition-colors hover:bg-transparent ${
                    item.id === dealTypeShadow
                      ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                      : "bg-transparent"
                  }`}
                  onClick={() => onOptionSelect(item, "dealType")}
                >
                  {item.label}
                </Cell>
              ))}
              {/* <ModalClose>
                <div className="p-6">
                  <Button
                    size="m"
                    stretched
                    onClick={() => }
                  >
                    არჩევა
                  </Button>
                </div>
              </ModalClose> */}
            </Modal>
            <Modal
              header={<ModalHeader />}
              trigger={
                <Cell>
                  {propertyType === undefined
                    ? "ქონების ტიპი"
                    : propertyTypeLabel}
                </Cell>
              }
              onOpenChange={(open) => onOpenChange(open, "propertyType")}
            >
              <div className="flex justify-between items-center px-6 pb-6">
                <Headline plain weight="2" className="flex justify-between">
                  ქონების ტიპი
                </Headline>
                <Button
                  size="s"
                  mode="bezeled"
                  className="flex-shrink-0"
                  onClick={() => onClear("propertyType")}
                >
                  გასუფთავება
                </Button>
              </div>
              {propertyTypeMap.map((item) => (
                <Cell
                  key={item.id}
                  className={`px-6 transition-colors hover:bg-transparent ${
                    item.id === propertyTypeShadow
                      ? "!bg-[--tgui--button_color] text-[--tgui--button_text_color]"
                      : "bg-transparent"
                  }`}
                  onClick={() => onOptionSelect(item, "propertyType")}
                >
                  {item.label}
                </Cell>
              ))}
              <ModalClose>
                <div className="p-6">
                  <Button
                    size="m"
                    stretched
                    onClick={() => onSelect("propertyType")}
                  >
                    არჩევა
                  </Button>
                </div>
              </ModalClose>
            </Modal>
            <Cell>მდებარეობა</Cell>
            <Cell>ფართი</Cell>
            <Cell>ფასი</Cell>
          </Section>
        </List>
      </Fragment>
    </SDKProvider>
  );
}
