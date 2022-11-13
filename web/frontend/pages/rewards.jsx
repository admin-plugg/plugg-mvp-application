import {
  Frame,
  Navigation,
  TopBar,
  Page,
  Card,
  Button,
} from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  GiftCardMinor,
  ReportMinor,
} from "@shopify/polaris-icons";
import React, { useState, useCallback } from "react";
import { Container, Row } from "react-grid-system";
import { RewardCard, RewardModal } from "../components";

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
          selected: false,
        },
        {
          url: "/rewards",
          label: "Rewards",
          icon: GiftCardMinor,
          selected: true,
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

const rewards = [
  {
    id: "1",
    title: "Reward Name 1",
    description: "Reward Description 1",
    numRedemptions: 2,
    frequencyOfRedemption: "6",
    isActive: true,
    programs: [],
  },
  {
    id: "2",
    title: "Reward Name 2",
    description: "Reward Description 2",
    numRedemptions: 10,
    frequencyOfRedemption: "4",
    isActive: false,
    programs: [],
  },
];

export default function HomePage() {
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
        title="Rewards"
        subtitle="Setup different rewards linked to the programs and configure the redemption rate."
        primaryAction={
          <Button primary onClick={handleOpen}>
            Create
          </Button>
        }
      >
        <Container fluid>
          <Row>
            <RewardCard rewards={rewards} />
            <RewardModal
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
