import { Text, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function ReportCard(props: { name: string; link: string; bg?: string }) {
  const { name, link, bg } = props;
  const navigate = useNavigate();

  return (
    <Button
      justifyContent={'start'}
      width={{ base: '100%' }}
      onClick={() => navigate(`/report/${link}`)}
      bg={`${bg !== undefined ? `${bg}.200` : 'orange.200'}`}
      _hover={{
        bg: `${bg !== undefined ? `${bg}.300` : 'orange.300'}`,
      }}
    >
      <Text fontSize={'3xl'}>{name}</Text>
    </Button>
  );
}
