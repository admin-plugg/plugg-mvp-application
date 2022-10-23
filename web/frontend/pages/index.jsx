import {
  Frame,
  Navigation,
  TopBar,
  Page,
  Card,
  Badge,
  Button,
} from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  GiftCardMinor,
  ReportMinor,
} from "@shopify/polaris-icons";
import React, { useState, useCallback, useRef } from "react";
import { Container, Row, Col } from "react-grid-system";
import { ProgramModal } from "../components";

/*
TODO:
1. Add Create & Edit Screen as Modal.
2. Add actions to Cards.
3. Add Navigation Actions.
4. Fix Navigation for Mobile and small Screens.
5. Fix the Badge alignment issue.
6. Get Active, Inactive & Expired status in one place and use it to generate badges and actions.
*/

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
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
];

function ProgramsAsCards(props) {
  const activeProgramCards = [],
    inActiveProgramCards = [];
  props.programs.forEach((program) => {
    if (program.isActive === false) {
      inActiveProgramCards.push(
        <Col key={program.id}>
          <Card
            sectioned
            title={program.title}
            key={program.id}
            primaryFooterAction={{ content: "Delete", destructive: true }}
            subdued
          >
            <RenderBadgeBasedOnProgramDates program={program} />
            <Card.Section>
              <p>{program.description}</p>
            </Card.Section>
          </Card>
        </Col>
      );
    } else {
      activeProgramCards.push(
        <Col key={program.id}>
          <Card
            sectioned
            title={program.title}
            key={program.id}
            primaryFooterAction={{ content: "Delete", destructive: true }}
            secondaryFooterActions={[{ content: "Edit" }]}
          >
            <RenderBadgeBasedOnProgramDates program={program} />
            <Card.Section>
              <p>{program.description}</p>
            </Card.Section>
          </Card>
        </Col>
      );
    }
  });
  return activeProgramCards.concat(inActiveProgramCards);
}

function RenderBadgeBasedOnProgramDates(props) {
  /*
  InActive: If isActive flag is False;
  Active: If isActive flag is True && (endDate === null || endDate > now);
  Expired: If isActive flag is True; If endDate < now;
  */
  let activeBadge = (
    <Badge status="success" progress="complete">
      Active
    </Badge>
  );
  let expiredBadge = (
    <Badge status="warning" progress="partiallyComplete">
      Expired
    </Badge>
  );
  let inActiveBadge = <Badge progress="complete">Inactive</Badge>;
  if (props.program === null || props.program.isActive === null) {
    return;
  }
  if (props.program.isActive === false) {
    return inActiveBadge;
  }
  if (props.program.endDate !== null) {
    let isEndDateValid = new Date(props.program.endDate).getTime() > 0;
    if (isEndDateValid === false) {
      return;
    }
    if (props.program.endDate < Date.now()) {
      return expiredBadge;
    } else {
      return activeBadge;
    }
  } else {
    return activeBadge;
  }
}

export default function ProgramsScreen() {
  const [isModalActive, setModalActive] = useState(false);

  const buttonRef = useRef(null);

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
        subtitle="Your loyalty and rewards programs."
        primaryAction={
          <Button primary onClick={handleOpen} ref={buttonRef}>
            Create
          </Button>
        }
      >
        <Container fluid>
          <Row>
            <ProgramsAsCards programs={programs} />
            <ProgramModal active={isModalActive} handleClose={handleClose} />
          </Row>
        </Container>
      </Page>
    </Frame>
  );
}
