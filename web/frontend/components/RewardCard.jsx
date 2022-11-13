import { Card, Badge } from "@shopify/polaris";
import { Col } from "react-grid-system";
import React, { useState, useCallback, useRef } from "react";
import { RewardModal } from "../components";

export function RewardCard(props) {
  const activeRewardCards = [],
    inActiveRewardCards = [];
  props.rewards.forEach((reward) => {
    const rewardCard = (
      <RenderCardForEachReward key={reward.id} reward={reward} />
    );
    if (reward.isActive === false) {
      inActiveRewardCards.push(rewardCard);
    } else {
      activeRewardCards.push(rewardCard);
    }
  });
  return activeRewardCards.concat(inActiveRewardCards);
}

function RenderCardForEachReward(props) {
  const [isModalActive, setModalActive] = useState(false);
  const buttonRef = useRef(null);
  const handleOpen = useCallback(() => setModalActive(true), []);
  const handleClose = useCallback(() => {
    setModalActive(false);
  }, []);
  return (
    <Col key={props.reward.id}>
      <Card
        sectioned
        title={props.reward.title}
        key={props.reward.id}
        primaryFooterAction={{ content: "Delete", destructive: true }}
        secondaryFooterActions={[
          {
            content: "Edit",
            onAction: handleOpen,
            buttonRef: buttonRef,
          },
        ]}
      >
        <RewardModal
          active={isModalActive}
          handleClose={handleClose}
          title={props.reward.title}
          description={props.reward.description}
        />
        <RenderBadgeBasedOnStatus reward={props.reward} />
        <Card.Section>
          <p>{props.reward.description}</p>
        </Card.Section>
      </Card>
    </Col>
  );
}

function RenderBadgeBasedOnStatus(props) {
  /*
    InActive: If isActive flag is False;
    Active: If isActive flag is True;
    */
  let activeBadge = (
    <Badge status="success" progress="complete">
      Active
    </Badge>
  );
  let inActiveBadge = <Badge progress="complete">Inactive</Badge>;
  if (props.reward === null || props.reward.isActive === null) {
    return;
  }
  if (props.reward.isActive === false) {
    return inActiveBadge;
  } else {
    return activeBadge;
  }
}
