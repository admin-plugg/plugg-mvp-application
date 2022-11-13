import { Card, Badge } from "@shopify/polaris";
import { Col } from "react-grid-system";
import React, { useState, useCallback, useRef } from "react";
import { ProgramModal } from "../components";

export function ProgramCard(props) {
  const activeProgramCards = [],
    inActiveProgramCards = [];
  props.programs.forEach((program) => {
    const programCard = (
      <RenderCardForEachProgram key={program.id} program={program} />
    );
    if (program.isActive === false) {
      inActiveProgramCards.push(programCard);
    } else {
      activeProgramCards.push(programCard);
    }
  });
  return activeProgramCards.concat(inActiveProgramCards);
}

function RenderCardForEachProgram(props) {
  const [isModalActive, setModalActive] = useState(false);
  const buttonRef = useRef(null);
  const handleOpen = useCallback(() => setModalActive(true), []);
  const handleClose = useCallback(() => {
    setModalActive(false);
  }, []);
  return (
    <Col key={props.program.id}>
      <Card
        sectioned
        title={props.program.title}
        key={props.program.id}
        primaryFooterAction={{ content: "Delete", destructive: true }}
        secondaryFooterActions={[
          {
            content: "Edit",
            onAction: handleOpen,
            buttonRef: buttonRef,
          },
        ]}
      >
        <ProgramModal
          active={isModalActive}
          handleClose={handleClose}
          title={props.program.title}
          description={props.program.description}
          startDate={props.program.startDate}
          endDate={props.program.endDate}
          selected={props.program.type}
        />
        <RenderBadgeBasedOnProgramDates program={props.program} />
        <Card.Section>
          <p>{props.program.description}</p>
        </Card.Section>
      </Card>
    </Col>
  );
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
