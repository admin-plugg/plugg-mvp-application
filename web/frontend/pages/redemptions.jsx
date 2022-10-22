import { Frame, Navigation, TopBar } from "@shopify/polaris";
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
          selected: false,
        },
        {
          url: "/redemptions",
          label: "Redemptions",
          icon: ProductsMinor,
          selected: true,
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

export default function HomePage() {
  return (
    <Frame
      logo={logo}
      topBar={topBarMarkup}
      navigation={navigationBarMarkup}
    ></Frame>
  );
}
