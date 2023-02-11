import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { modes } from '../../model/OrderData';

export default function EditMode(props: {
  id: number;
  isOpen: boolean;
  onClose: () => void;
  mode: number;
}) {
  const toast = useToast();
  const { isOpen, onClose, mode, id } = props;
  const [status, setStatus] = useState(mode);
  const updateMode = () => {
    toast({ title: 'status atualizado', position: 'top-right', duration: 2000 });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alterar pedido ${id}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Select onChange={(v) => setStatus(Number(v.target.value))}>
            {modes.map((m) => (
              <option value={m.code} selected={m.code === status}>
                {m.label}
              </option>
            ))}
          </Select>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Fechar
          </Button>
          <Button variant='ghost' onClick={updateMode}>
            Atualizar Status
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
