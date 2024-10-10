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
} from "@telegram-apps/telegram-ui";

import { Link } from "@/components/Link/Link";

import tonSvg from "./_assets/ton.svg";
import { useState } from "react";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

export default function Home() {
  const [dealType, setDealType] = useState(false);
  const [propertyType, setPropertyType] = useState(false);

  return (
    <List>
      <Section>
        <Cell
          onClick={() => {
            setDealType(!dealType);
          }}
        >
          გარიგების ტიპი
        </Cell>
        <Modal open={dealType}>
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
        <Cell
          onClick={() => {
            setPropertyType(!propertyType);
          }}
        >
          ქონების ტიპი
        </Cell>
        <Modal open={propertyType}>
          <ModalHeader />
          <Text>ქონების ტიპი</Text>
          <IconButton>გასუფთავება</IconButton>
          <Section>
            <Cell>კერძო სახლი</Cell>
            <Cell>ბინა</Cell>
            <Cell>მიწა</Cell>
            <Cell>კომერციული</Cell>
            <Cell>სასტუმრო</Cell>
            <Cell>აგარაკი</Cell>
          </Section>
        </Modal>
      </Section>
    </List>
  );
}
