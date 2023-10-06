import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface ConfirmDialogProps {
  show: boolean;
  setShow: (show: boolean) => void;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<
  ConfirmDialogProps & {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
  }
> = ({ title, content, onConfirm, onCancel, show, setShow }) => {
  const handleClose = () => {
    setShow(false);
    onCancel();
  };

  const handleConfirm = () => {
    setShow(false);
    onConfirm();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{content}</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
