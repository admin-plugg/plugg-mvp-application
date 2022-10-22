import { Frame, Navigation, TopBar, Page, Card } from "@shopify/polaris";
import {
  HomeMinor,
  ProductsMinor,
  GiftCardMinor,
  ReportMinor,
} from "@shopify/polaris-icons";

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
    uuid: "uuid-1",
    id: "1",
    title: "Reward Name 1",
    description: "Reward Description 1",
    type: {
      id: "type-1",
      name: "Discount",
    },
    startDate: null,
    endDate: null,
    frequencyOfRedemption: {
      id: "freq-1",
      name: "Daily",
    },
    isActive: false,
    nft: null,
    merchantId: "sampleId",
  },
  {
    uuid: "uuid-2",
    id: "2",
    title: "Reward Name 2",
    description: "Reward Description 1",
    type: {
      id: "type-2",
      name: "Discount",
    },
    startDate: null,
    endDate: null,
    frequencyOfRedemption: {
      id: "freq-2",
      name: "Daily",
    },
    isActive: true,
    nft: null,
    merchantId: "sampleId",
  },
];

function RewardsAsCards(props) {
  const activeRewardCards = [],
    inActiveRewardCards = [];
  props.rewards.forEach((reward) => {
    let nftCardImg;
    if (reward.nft !== null && reward.nft.url !== null) {
      nftCardImg = <Card.Img variant="top" src={reward.nft.url} />;
    }

    if (reward.isActive === false) {
      inActiveRewardCards.push(
        <Card sectioned title={reward.title} key={reward.id} subdued>
          <Card.Section>
            <p>{reward.description}</p>
          </Card.Section>
        </Card>
      );
    } else {
      activeRewardCards.push(
        <Card
          sectioned
          title={reward.title}
          key={reward.id}
          primaryFooterAction={{ content: "Delete", destructive: true }}
          secondaryFooterActions={[{ content: "Edit" }]}
        >
          <Card.Section>
            <p>{reward.description}</p>
          </Card.Section>
        </Card>
      );
    }
  });
  return activeRewardCards.concat(inActiveRewardCards);
}

export default function HomePage() {
  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationBarMarkup}>
      <Page fullWidth divider title="Rewards">
        <RewardsAsCards rewards={rewards} />
      </Page>
    </Frame>
  );
}
