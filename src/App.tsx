import { Container, Spacer } from "@chakra-ui/react";
import Nav from "./core/widgets/Nav";
import Home from "./pages/home/Home";

export default function App() {
  return <>
    <Nav />
    <Container maxW="container.xl" p={4}>
      <Home />
    </Container>
  </>
}