import { Frame, Navigation, TopBar, Page, Button } from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  GiftCardMinor,
  ReportMinor,
} from "@shopify/polaris-icons";
import React, { useState, useCallback } from "react";
import { Container, Row } from "react-grid-system";
import { ProgramModal, ProgramCard } from "../components";

const logo = {
  width: 35,
  topBarSource: "https://plugg.network/assets/images/image03.png?v=1d779aeb",
  contextualSaveBarSource:
    "https://plugg.network/assets/images/image03.png?v=1d779aeb",
  url: "https://plugg.network/",
  accessibilityLabel: "Plugg.Network",
};

const topBarMarkup = <TopBar showNavigationToggle></TopBar>;

const navigationBarMarkup = (
  <Navigation location="/">
    <Navigation.Section
      items={[
        {
          url: "/",
          label: "Program",
          icon: HomeMinor,
          selected: true,
        },
        {
          url: "/rewards",
          label: "Rewards",
          icon: GiftCardMinor,
          selected: false,
        },
        {
          url: "/redemptions",
          label: "Redemptions",
          icon: ProductsMinor,
          selected: false,
        },
        {
          url: "/activity",
          label: "Activity",
          icon: ReportMinor,
          selected: false,
        },
      ]}
    />
  </Navigation>
);

const programs = [
  {
    uuid: "uuid-1",
    id: "1",
    title: "Program 1",
    description: "description 1",
    startDate: 1666454138,
    endDate: 1666454138,
    type: "1",
    isActive: false,
    nft: null,
    merchantId: "sampleId",
  },
  {
    uuid: "uuid-2",
    id: "2",
    title: "Program 2",
    description: "description 2",
    startDate: 1666454130,
    endDate: 1666454138,
    type: "2",
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
  {
    uuid: "uuid-3",
    id: "3",
    title: "Program 3",
    description: "description 3",
    startDate: 1666454138,
    endDate: null,
    type: "3",
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
];

export default function ProgramsScreen() {
  const [isModalActive, setModalActive] = useState(false);
  const handleOpen = useCallback(() => setModalActive(true), []);
  const handleClose = useCallback(() => {
    setModalActive(false);
  }, []);

  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationBarMarkup}>
      <Page
        fullWidth
        divider
        title="Programs"
        subtitle="Setup different types of engagement programs to add value to your customers."
        primaryAction={
          <Button primary onClick={handleOpen}>
            Create
          </Button>
        }
      >
        <Container fluid>
          <Row>
            <ProgramCard programs={programs} />
            <ProgramModal
              active={isModalActive}
              handleClose={handleClose}
              renderType={"Create"}
            />
          </Row>
        </Container>
      </Page>
    </Frame>
  );
}
