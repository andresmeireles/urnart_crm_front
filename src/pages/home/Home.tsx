import { AddIcon, AttachmentIcon, DownloadIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { SimpleGrid } from '@chakra-ui/react';
import Menu from './components/Menu';

export default function Home() {
  return (
    <>
      <SimpleGrid columns={2} row={2} spacing={10} gap={3}>
        <Menu icon={<AddIcon />} color='green.300' name='Produtos' navigateTo='product' />
        <Menu icon={<ExternalLinkIcon />} color='blue.300' name='Clientes' navigateTo='customer' />
        <Menu icon={<AttachmentIcon />} name='Produtos' />
        <Menu icon={<DownloadIcon />} name='Produtos' />
      </SimpleGrid>
    </>
  );
}
