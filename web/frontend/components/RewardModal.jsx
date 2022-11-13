import {
  Modal,
  FormLayout,
  TextField,
  Select,
  OptionList,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import _ from "lodash";
import { useAuthenticatedFetch } from "../hooks";

export function RewardModal(props) {
  const redemptionFrequencyOptions = [
    { label: "Daily", value: "1" },
    { label: "Weekly", value: "2" },
    { label: "Monthly", value: "3" },
    { label: "Quarterly", value: "4" },
    { label: "Yearly", value: "5" },
    { label: "Once", value: "6" },
  ]; // TODO: Get them from Backend.
  const programOptions = [
    { label: "Daily", value: "1" },
    { label: "Weekly", value: "2" },
    { label: "Monthly", value: "3" },
    { label: "Quarterly", value: "4" },
    { label: "Yearly", value: "5" },
    { label: "Once", value: "6" },
  ]; // TODO: Get them from Backend.
  const fetch = useAuthenticatedFetch();
  const handleSubmit = async () => {
    console.log("Making API Call");
    let programState = {
      name: title,
      description: description,
      startDate: startDate,
      endDate: endDate,
      isActive: true,
      merchantId: null,
      programTypeId: selected,
    };
    fetch("/api/merchant/getOrcreate")
      .then((merchant) => {
        console.log("Got Merchant: ", merchant);
        programState.merchantId = merchant.id;
        return fetch("/api/program", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programState),
        });
      })
      .then((res) => {
        console.log("Got Post Response", res);
      })
      .catch((err) => {
        // Show Error in Toast Format
        console.error(err);
      });
    props.handleClose();
  };
  const [title, setTitle] = useState(props.title ?? ""), // TODO: Cleanup State Variables.
    [description, setDescription] = useState(props.description ?? ""),
    [numRedemptions, setNumRedemptions] = useState(props.numRedemptions ?? 0),
    [redemptionFrequency, setRedemptionFrequency] = useState(
      props.redemptionFrequency ?? "6"
    ),
    [programs, setPrograms] = useState(props.programs ?? []);
  const handleTitleChange = useCallback((value) => setTitle(value), []),
    handleDescriptionChange = useCallback((value) => setDescription(value), []),
    handleNumRedemptions = useCallback((value) => setNumRedemptions(value), []),
    handleRedemptionFrequency = useCallback(
      (value) => setRedemptionFrequency(value),
      []
    ),
    handlePrograms = useCallback((value) => setPrograms(value), []);
  return (
    <Modal
      large
      open={props.active}
      onClose={props.handleClose}
      title="Reward"
      primaryAction={{
        content: "Save",
        onAction: handleSubmit,
      }}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            label="Title"
            onChange={handleTitleChange}
            value={title}
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="Description"
            onChange={handleDescriptionChange}
            value={description}
            multiline={4}
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="Redemptions per user"
            onChange={handleNumRedemptions}
            type="number"
            value={numRedemptions}
            autoComplete="off"
            requiredIndicator={true}
          />
          <Select
            label="Frequency of redemption"
            options={redemptionFrequencyOptions}
            onChange={handleRedemptionFrequency}
            value={redemptionFrequency}
          />
          <OptionList
            title="Related programs"
            onChange={handlePrograms}
            options={programOptions}
            selected={programs}
            allowMultiple
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}
