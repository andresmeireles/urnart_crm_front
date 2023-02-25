import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';

export default function (props: {
  isOpen: boolean;
  hasClose?: boolean;
  onClose: () => void;
  title: string;
  body: JSX.Element;
}) {
  const { isOpen, onClose, title, body, hasClose = false } = props;

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          {hasClose ? (
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          ) : (
            <></>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
