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

export default function Home() {
  const [dealType, setDealType] = useState(false);
  const [propertyType, setPropertyType] = useState(false);

  return (
    <Fragment>
      <List>
        <Section>
          <Cell onClick={() => setDealType(!dealType)}>გარიგების ტიპი</Cell>
          <Cell onClick={() => setPropertyType(!propertyType)}>
            ქონების ტიპი
          </Cell>
        </Section>
        <Section>
          <Button mode="filled" stretched>
            ძიება
          </Button>
        </Section>
      </List>

      <Modal open={dealType} modal>
        <ModalHeader />
        <Text>გარიგების ტიპი</Text>
        <IconButton>გასუფთავება</IconButton>
        <Section>
          <Cell>ქირავდება</Cell>
          <Cell>იყიდება</Cell>
          <Cell>გირავდება</Cell>
          <Cell>ქირავდება დღიურად</Cell>
        </Section>
      </Modal>
      <Modal open={propertyType} modal>
        <ModalHeader />
        <Text>ქონების ტიპი</Text>
        <IconButton>გასუფთავება</IconButton>
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
