import { Flex } from "components/Flex/Flex";
import { ReactNode } from "react";
import { Modal as BModal } from "react-bootstrap";

interface Props {
  modalTitle: string;
  show: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
  title: string;
  subtitle: string;
}

// todo extract when more modal designs show up

export const Modal = ({
  show,
  onDismiss,
  modalTitle,
  children,
  title,
  subtitle,
}: Props) => {
  return (
    <BModal
      className="modal-lighter"
      animation={false}
      show={show}
      onHide={onDismiss}
    >
      {modalTitle && (
        <BModal.Header>
          <BModal.Title className="my-0">{modalTitle}</BModal.Title>
        </BModal.Header>
      )}
      <BModal.Body>
        <Flex column alignItems="center" justifyContent="center">
          <h3
            style={{ marginBottom: "3rem", textAlign: "center" }}
            className="lead"
          >
            {title}
          </h3>
          <p
            className="text-muted"
            style={{
              padding: "0rem 2rem",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            {subtitle}
          </p>
          {children}
        </Flex>
      </BModal.Body>
    </BModal>
  );
};
