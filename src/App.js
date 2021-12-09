
import styled from 'styled-components';
import { Products } from './components/products';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5rem;
`;

const Title = styled.h1`
  font-weight: bold;
`;

function App() {
  return (
    <AppContainer>
      <Title>React Tables</Title>
      <Products />
    </AppContainer>
  );
}

export default App;
