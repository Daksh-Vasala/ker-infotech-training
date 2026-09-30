import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  loading?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

const ConfirmationModal = ({
  isOpen,
  title,
  message,
  loading = false,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmColor = "danger",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={onCancel}>
      <ModalHeader toggle={onCancel}>{title}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color={confirmColor} onClick={onConfirm} disabled={loading}>
          {loading ? "Loading..." : confirmLabel}
        </Button>
        <Button color="secondary" outline onClick={onCancel} disabled={loading}>
          {cancelLabel}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
