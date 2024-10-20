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
} from "@telegram-apps/telegram-ui";

import { Link } from "@/components/Link/Link";

import tonSvg from "./_assets/ton.svg";
import { Fragment, useState } from "react";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { SectionFooter } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionFooter/SectionFooter";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";

export default function Home() {
  const [dealType, setDealType] = useState(false);
  const [propertyType, setPropertyType] = useState(false);

  return (
    <Fragment>
      <List>
        <SectionHeader large>SS.GE</SectionHeader>
        <Section>
          <Cell onClick={() => setDealType(!dealType)}>გარიგების ტიპი</Cell>
          <Cell onClick={() => setPropertyType(!propertyType)}>
            ქონების ტიპი
          </Cell>
        </Section>
        <SectionFooter>
          <Button mode="filled" stretched>
            ძიება
          </Button>
        </SectionFooter>
      </List>

      <Modal open={dealType} modal>
        <ModalHeader />
        <SectionHeader>
          <Text>გარიგების ტიპი</Text>
          <IconButton>გასუფთავება</IconButton>
        </SectionHeader>
        <Section>
          <Cell>ქირავდება</Cell>
          <Cell>იყიდება</Cell>
          <Cell>გირავდება</Cell>
          <Cell>ქირავდება დღიურად</Cell>
        </Section>
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
  );
}
