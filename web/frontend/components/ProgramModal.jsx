import { Modal, TextContainer } from "@shopify/polaris";

export function ProgramModal(props) {
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
          <TextContainer>
            <p>
              Use Instagram posts to share your products with millions of
              people. Let shoppers buy from your store without leaving
              Instagram.
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}
