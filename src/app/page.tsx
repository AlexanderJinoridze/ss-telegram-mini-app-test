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
  Badge
} from "@telegram-apps/telegram-ui";

import { Link } from "@/components/Link/Link";

import tonSvg from "./_assets/ton.svg";
import { useState } from "react";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";

export default function Home() {
  const [dealType, setDealType] = useState(false);

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
      </Section>
      <Section
        header="Features"
        footer="You can use these pages to learn more about features, provided by Telegram Mini Apps and other useful projects"
      >
        <Link href="/ton-connect">
          <Cell
            before={
              <Image src={tonSvg.src} style={{ backgroundColor: "#007AFF" }} />
            }
            subtitle="Connect your TON wallet"
          >
            TON Connect
          </Cell>
        </Link>
      </Section>
      <Section
        header="Application Launch Data"
        footer="These pages help developer to learn more about current launch information"
      >
        <Link href="/init-data">
          <Cell subtitle="User data, chat information, technical data">
            Init Data
          </Cell>
        </Link>
        <Link href="/launch-params">
          <Cell subtitle="Platform identifier, Mini Apps version, etc.">
            Launch Parameters
          </Cell>
        </Link>
        <Link href="/theme-params">
          <Cell subtitle="Telegram application palette information">
            Theme Parameters
          </Cell>
        </Link>
      </Section>
    </List>
  );
}
