import { Button, Heading, Icon, Flex } from '@chakra-ui/react';
import { ImSad } from 'react-icons/im';

export function Error(): JSX.Element {
  return (
    <Flex h="100vh" w="100vw" justifyContent="center" alignItems="center">
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w={["inherit", "initial"]}
        px={["1rem", "1.125rem", "1.5rem", "2.5rem"]}
      >
        <Heading fontSize={["1.125rem"]}>Infelizmente ocorreu um erro <Icon as={ImSad} w={5} h={5} /></Heading>

        <Button
          onClick={() => window.location.reload()}
          mt={4}
          variant="orange-dark/light"
          borderRadius="0.25rem"
          fontSize={["1rem"]}
        >
          Clique aqui para tentar novamente
        </Button>
      </Flex>
    </Flex>
  );
}
