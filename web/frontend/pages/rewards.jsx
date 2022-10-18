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

const topBarMarkup = (<TopBar showNavigationToggle >
</TopBar>);

const navigationBarMarkup = (
  <Navigation location="/">
    <Navigation.Section
      items={[
        {
          url: "/programs",
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

export default function HomePage() {
  return (
    <Frame
      logo={logo}
      topBar={topBarMarkup}
      navigation={navigationBarMarkup}
      ></Frame>
  );
}
