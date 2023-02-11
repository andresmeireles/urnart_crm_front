import { Box, Container } from '@chakra-ui/react';
import Header from '../../../core/components/Header';
import ReportCard from '../components/ReportCard';

interface ListInterface {
  name: string;
  link: string;
  color?: string;
}

export default function List() {
  const reports: ListInterface[] = [
    { name: 'etiquetas', link: 'tag' },
    { name: 'relatorio de saida', link: 'exit', color: 'red' },
  ];

  return (
    <>
      <Header name='lista dos relatorios' />
      <Container minW={'container.lg'} mt={6}>
        {reports.map((report) => (
          <Box mt={6}>
            <ReportCard name={report.name} bg={report.color} link={report.link} />
          </Box>
        ))}
      </Container>
    </>
  );
}
