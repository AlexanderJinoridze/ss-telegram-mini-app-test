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
} from "@telegram-apps/sdk-react";

export default function Home() {
  const [dealType, setDealType] = useState(false);
  const [propertyType, setPropertyType] = useState(false);
  const zaza = useMainButton();

  zaza.show();
  zaza.enable();
  zaza.setText("ZAZA");
  console.log(zaza.bgColor);

  useEffect(() => {}, []);

  const debug = useLaunchParams().startParam === "debug";

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <Fragment>
        <Script src="https://telegram.org/js/telegram-web-app.js" />
        {typeof window !== "undefined" ? (
          <pre>{(window as any).Telegram.BottomButton}</pre>
        ) : null}
        <List>
          <SectionHeader large>SS.GE</SectionHeader>
          <Section>
            <Cell onClick={() => setDealType(!dealType)}>გარიგების ტიპი</Cell>
            <Cell onClick={() => setPropertyType(!propertyType)}>
              ქონების ტიპი
            </Cell>
          </Section>
          {/* <FixedLayout>
            <Button mode="filled" stretched>
              ძიება
            </Button>
          </FixedLayout> */}
        </List>

        <Modal open={dealType} modal>
          <ModalHeader />
          <SectionHeader>
            <Text>გარიგების ტიპი</Text>
            <IconButton>გასუფთავება</IconButton>
          </SectionHeader>
          <Cell>ქირავდება</Cell>
          <Cell>იყიდება</Cell>
          <Cell>გირავდება</Cell>
          <Cell>ქირავდება დღიურად</Cell>
        </Modal>
        <Modal open={propertyType} modal>
          <ModalHeader />
          <SectionHeader>
            <Text>ქონების ტიპი</Text>
            <IconButton>გასუფთავება</IconButton>
          </SectionHeader>
          <Section>
            <ButtonCell>კერძო სახლი</ButtonCell>
            <ButtonCell>ბინა</ButtonCell>
            <ButtonCell>მიწა</ButtonCell>
            <ButtonCell>კომერციული</ButtonCell>
            <ButtonCell>სასტუმრო</ButtonCell>
            <ButtonCell>აგარაკი</ButtonCell>
          </Section>
        </Modal>
      </Fragment>
    </SDKProvider>
  );
}
