import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Title from './components/layout/Title';
import AddPeople from './components/forms/AddPeople';
import AddCars from './components/forms/AddCars';
import './App.css';
import People from './components/lists/People';
import { GET_PEOPLE } from './queries';
import { useQuery } from '@apollo/client';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});


const App = () => {



  return (
    <ApolloProvider client={client}>
    <div className="App">
      <Title />
      <AddPeople />
      <AddCars  />
      <People />
      </div>
    </ApolloProvider>
  );
}

export default App;
