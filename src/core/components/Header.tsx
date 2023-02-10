import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, Flex, Text, IconButton, Center, Spacer } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header(props: { name: string; actions?: ReactNode[] }) {
  const { name, actions = [] } = props;
  const navigate = useNavigate();

  return (
    <Flex align='center' alignContent='center' alignItems='center' alignSelf='center'>
      <Box display={'flex'} flex={1} justifyContent='center'>
        <IconButton aria-label='back' icon={<ArrowBackIcon />} onClick={() => navigate(-1)} />
      </Box>
      <Text flex='3' fontSize={'3xl'} align='center'>
        {name}
      </Text>
      <Box display='flex' flex={2} gap={5} justifyContent='center'>
        {actions.map((a) => a)}
      </Box>
    </Flex>
  );
}
