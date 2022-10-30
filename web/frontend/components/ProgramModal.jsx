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

export function ProgramModal(props) {
  const options = [
    { label: "Loyalty", value: "1" },
    { label: "Memebership", value: "2" },
    { label: "Gate Access", value: "3" },
    { label: "Collectables", value: "4" },
  ]; // TODO: Get them from Backend.
  const [title, setTitle] = useState(props.title ?? ""), // TODO: Cleanup State Variables.
    [description, setDescription] = useState(props.description ?? ""),
    [startDate, setStartDate] = useState(props.startDate ?? new Date()),
    [endDate, setEndDate] = useState(props.endDate ?? new Date()),
    [selected, setSelected] = useState(props.selected ?? "1"),
    [nftImage, setNftImage] = useState(props.nftImage ?? []),
    [rejectedNFTImage, setRejectedNFTImage] = useState([]);
  const handleSubmit = useCallback((_event) => setTitle(""), []); // TODO: Handle Submit.
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
            {file.name} <Caption>{file.size/1024} kb</Caption>
          </div>
        </Stack>
      ))}
    </Stack>
  );
  return (
    <div style={{ height: "500px" }}>
      <Modal
        large
        open={props.active}
        onClose={props.handleClose}
        title="Program"
        primaryAction={{
          content: "Save",
          onAction: props.handleClose,
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
              type="date"
              onChange={handleStartDateChange}
              value={startDate}
              autoComplete="off"
              requiredIndicator={true}
            />
            <TextField
              label="End date"
              type="date"
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
              <DropZone accept="image/*" type="image" onDrop={handleNFTImageDrop} label="NFTImage">
                {uploadedFiles}
                {fileUpload}
              </DropZone>
            </Stack>
          </FormLayout>
        </Modal.Section>
      </Modal>
    </div>
  );
}
