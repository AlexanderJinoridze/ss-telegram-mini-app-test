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

import { Link } from "@/components/Link/Link";

import tonSvg from "./_assets/ton.svg";
import { Fragment, useEffect, useState } from "react";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { SectionFooter } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionFooter/SectionFooter";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import Head from "next/head";
import Script from "next/script";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import {
  SDKProvider,
  useLaunchParams,
  useMainButton,
  useMiniApp,
} from "@telegram-apps/sdk-react";

export default function Home() {
  const [dealType, setDealType] = useState<number | undefined>(undefined);
  const [dealTypeShadow, setDealTypeShadow] = useState<number | undefined>(
    undefined
  );
  const [dealTypeLabel, setDealTypeLabel] = useState<string>();
  const [propertyType, setPropertyType] = useState<number | undefined>(
    undefined
  );
  const [propertyTypeLabel, setPropertyTypeLabel] = useState<string>();

  const mainButton = useMainButton();

  mainButton.show();
  mainButton.setText("გაგზავნა");

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

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        <List>
          <SectionHeader large>SS.GE</SectionHeader>
          <Section>
            <Modal
              header={<ModalHeader />}
              trigger={
                <Cell className="px-6">
                  {dealType === undefined ? "გარიგების ტიპი" : dealTypeLabel}
                </Cell>
              }
            >
              <div className="flex justify-between items-center px-6 pb-6">
                <Headline plain weight="2" className="flex justify-between">
                  გარიგების ტიპი
                </Headline>
                <Button
                  size="s"
                  mode="bezeled"
                  className="flex-shrink-0"
                  onClick={() => {
                    setDealTypeShadow(undefined);
                  }}
                >
                  გასუფთავება
                </Button>
              </div>
              {dealTypeMap.map((item) => (
                <Cell
                  key={item.id}
                  className="px-6"
                  style={{
                    backgroundColor:
                      item.id === dealTypeShadow
                        ? "var(--tgui--button_color)"
                        : "inherit",
                  }}
                  onClick={() => {
                    if (item.id === dealType) {
                      setDealTypeShadow(undefined);
                    } else {
                      setDealTypeShadow(item.id);
                      setDealTypeLabel(item.label);
                    }
                  }}
                >
                  {item.label}
                </Cell>
              ))}
              <ModalClose>
                <div className="p-6">
                  <Button
                    size="l"
                    stretched
                    onClick={() => setDealType(dealTypeShadow)}
                  >
                    არჩევა
                  </Button>
                </div>
              </ModalClose>
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
            >
              <div
                style={{
                  padding: "0 24px 8px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Headline plain weight="2">
                  ქონების ტიპი
                </Headline>
                <ModalClose>
                  <IconButton
                    onClick={() => {
                      setPropertyType(undefined);
                    }}
                  >
                    გასუფთავება
                  </IconButton>
                </ModalClose>
              </div>
              {propertyTypeMap.map((item) => (
                <ModalClose key={item.id}>
                  <Cell
                    style={{
                      paddingLeft: 24,
                      paddingRight: 24,
                      background:
                        item.id === propertyType
                          ? "var(--tgui--button_color)"
                          : "inherit",
                    }}
                    onClick={() => {
                      if (item.id === propertyType) {
                        setPropertyType(undefined);
                      } else {
                        setPropertyType(item.id);
                        setPropertyTypeLabel(item.label);
                      }
                    }}
                  >
                    {item.label}
                  </Cell>
                </ModalClose>
              ))}
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
