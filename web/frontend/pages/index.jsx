import { Frame, Navigation, TopBar, Page, Card } from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  GiftCardMinor,
  ReportMinor,
} from "@shopify/polaris-icons";
import React from "react";

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
        },
        {
          url: "/rewards",
          label: "Rewards",
          icon: GiftCardMinor,
        },
        {
          url: "/redemptions",
          label: "Redemptions",
          icon: ProductsMinor,
        },
        {
          url: "/activity",
          label: "Activity",
          icon: ReportMinor,
        },
      ]}
    />
  </Navigation>
);

const programs = [
  {
    uuid: "uuid-1",
    id: "1",
    title: "title 1",
    description: "description 1",
    startDate: null,
    endDate: null,
    isActive: false,
    nft: null,
    merchantId: "sampleId",
  },
  {
    uuid: "uuid-1",
    id: "1",
    title: "title 1",
    description: "description 1",
    startDate: null,
    endDate: null,
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
  {
    uuid: "uuid-1",
    id: "1",
    title: "title 1",
    description: "description 1",
    startDate: null,
    endDate: null,
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
];

function Programs(props) {
  const programCards = [];
  props.programs.forEach((program) => {
    if (program.isActive === false) {
      programCards.push(
        <Card sectioned title={program.title} subdued>
          <CardSection description={program.description} />
        </Card>
      );
    } else {
      programCards.push(
        <Card sectioned title={program.title} primaryFooterAction={{content: 'Delete', destructive: true}} secondaryFooterActions={[{content: 'Edit'}]}>
          <CardSection description={program.description} />
        </Card>
      );
    }
  });
  return programCards;
}

function CardSection(props) {
  if (props.description !== null) {
    return (
      <Card.Section>
        <p>props.description</p>
      </Card.Section>
    );
  }
}

export default function ProgramsScreen() {
  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationBarMarkup}>
      <Page fullWidth divider title="Programs">
        <Programs programs={programs}/>
      </Page>
    </Frame>
  );
}
