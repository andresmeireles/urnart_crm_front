import { AddIcon, AttachmentIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { SimpleGrid } from '@chakra-ui/react';
import Menu from './components/Menu';

export default function Home() {
  return (
    <>
      <SimpleGrid columns={2} row={2} spacing={10} gap={3}>
        <Menu icon={<AddIcon />} color='green.300' name='Produtos' navigateTo='product' />
        <Menu icon={<ExternalLinkIcon />} color='blue.300' name='Clientes' navigateTo='customer' />
        <Menu icon={<AttachmentIcon />} name='Pedidos' color='yellow.300' navigateTo='order' />
        <Menu icon={<AttachmentIcon />} name='Novo Pedido' color='yellow.300' navigateTo='order/add' />
        <Menu icon={<AttachmentIcon />} name='Caminhão' color='purple.300' navigateTo='order/add' />
        <Menu icon={<DownloadIcon />} name='Relatório' color="purple.200" navigateTo='report' />
      </SimpleGrid>
    </>
  );
}
