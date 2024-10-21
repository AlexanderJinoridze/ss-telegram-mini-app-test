"use client";

import {
  Section,
  Cell,
  Image,
  List,
  Select,
  Modal,
  IconContainer,
  Button,
  IconButton,
  Title,
  LargeTitle,
  Text,
  Input,
  Badge,
  ButtonCell,
  FixedLayout,
  Divider,
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
  const [dealType, setDealType] = useState(false);
  const [propertyType, setPropertyType] = useState(false);
  const mainButton = useMainButton();
  const miniApp = useMiniApp();

  mainButton.show();
  mainButton.setText("გაგზავნა");

  return (
    <SDKProvider>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        {typeof window !== "undefined" ? (
          <pre>{(window as any).Telegram.BottomButton}</pre>
        ) : null}
        <List>
          <SectionHeader large>SS.GE</SectionHeader>
          <Section>
            <Modal
              header={<ModalHeader />}
              trigger={<Cell>გარიგების ტიპი</Cell>}
            >
              <div
                style={{
                  padding: "12px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                                    alignItems: "center"
                }}
              >
                <Headline plain weight="2">
                  გარიგების ტიპი
                </Headline>
                <IconButton>გასუფთავება</IconButton>
              </div>

              <Cell>ქირავდება</Cell>
              <Cell>იყიდება</Cell>
              <Cell>გირავდება</Cell>
              <Cell>ქირავდება დღიურად</Cell>
            </Modal>
            <Modal header={<ModalHeader />} trigger={<Cell>ქონების ტიპი</Cell>}>
              <div
                style={{
                  padding: "12px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <Headline plain weight="2">
                  ქონების ტიპი
                </Headline>
                <IconButton>გასუფთავება</IconButton>
              </div>

              <Cell>კერძო სახლი</Cell>
              <Cell>ბინა</Cell>
              <Cell>მიწა</Cell>
              <Cell>კომერციული</Cell>
              <Cell>სასტუმრო</Cell>
              <Cell>აგარაკი</Cell>
            </Modal>
          </Section>
        </List>
      </Fragment>
    </SDKProvider>
  );
}
