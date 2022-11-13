import {
  Modal,
  FormLayout,
  TextField,
  DropZone,
  Select,
  Stack,
  Thumbnail,
  Caption,
} from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import _ from "lodash";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";

export function ProgramModal(props) {
  const options = [
    { label: "Loyalty", value: "1" },
    { label: "Memebership", value: "2" },
    { label: "Gate Access", value: "3" },
    { label: "Collectables", value: "4" },
  ]; // TODO: Get them from Backend.
  let startDateString = new Date().toISOString().slice(0, 10);
  if (_.has(props, "startDate")) {
    startDateString = new Date(props.startDate).toISOString().slice(0, 10);
  }
  let endDateString = new Date().toISOString().slice(0, 10);
  if (_.has(props, "endDate")) {
    endDateString = new Date(props.endDate).toISOString().slice(0, 10);
  }
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
      programTypeId: selected
    };
    fetch("/api/merchant/getOrcreate")
      .then((merchant) => {
        console.log("Got Merchant: ", merchant);
        programState.merchantId = merchant.id;
        return fetch("/api/program", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(programState)
        })
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
    [startDate, setStartDate] = useState(startDateString),
    [endDate, setEndDate] = useState(endDateString),
    [selected, setSelected] = useState(props.selected ?? "1"),
    [nftImage, setNftImage] = useState(props.nftImage ?? []),
    [rejectedNFTImage, setRejectedNFTImage] = useState([]);
  const handleTitleChange = useCallback((value) => setTitle(value), []),
    handleDescriptionChange = useCallback((value) => setDescription(value), []),
    handleStartDateChange = useCallback((value) => setStartDate(value), []),
    handleEndDateChange = useCallback((value) => setEndDate(value), []),
    handleSelectChange = useCallback((value) => setSelected(value), []),
    handleNFTImageDrop = useCallback(
      (_droppedFiles, acceptedNFTImage, rejectedNFTImage) => {
        setNftImage((nftImage) => [...nftImage, ...acceptedNFTImage]);
        setRejectedNFTImage(rejectedNFTImage);
      },
      []
    );
  const fileUpload = !nftImage.length && <DropZone.FileUpload />;
  const uploadedFiles = nftImage.length > 0 && (
    <Stack vertical>
      {nftImage.map((file, index) => (
        <Stack alignment="center" key={index}>
          <Thumbnail
            size="small"
            alt={file.name}
            source={window.URL.createObjectURL(file)}
          />
          <div>
            {file.name} <Caption>{file.size / 1024} kb</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );
  return (
    <Modal
      large
      open={props.active}
      onClose={props.handleClose}
      title="Program"
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
            label="Start date"
            type="datetime-local"
            onChange={handleStartDateChange}
            value={startDate}
            autoComplete="off"
            requiredIndicator={true}
          />
          <TextField
            label="End date"
            type="datetime-local"
            onChange={handleEndDateChange}
            value={endDate}
            autoComplete="off"
          />
          <Select
            label="Type"
            options={options}
            onChange={handleSelectChange}
            value={selected}
          />
          <Stack vertical>
            <DropZone
              accept="image/*"
              type="image"
              onDrop={handleNFTImageDrop}
              label="NFTImage"
            >
              {uploadedFiles}
              {fileUpload}
            </DropZone>
          </Stack>
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
}
