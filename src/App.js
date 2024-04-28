import React, { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import People from './Components/People';
import Planets from './Components/Planets';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Container, Dimmer, Loader } from 'semantic-ui-react';

function App() {
  const [people, setPeople] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPeople() {
      let res = await fetch('https://swapi.py4e.com/api/people/?format=json');
      let data = await res.json();
      setPeople(data.results);
      setLoading(false);
    }

  async function fetchPlanets() {
    let res = await fetch('https://swapi.py4e.com/api/planets/?format=json');
    let data = await res.json();
    setPlanets(data.results);
    setLoading(false);
  }

  fetchPeople();
  fetchPlanets();
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Container>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Routes>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/people' element={<People data={people}/>} />
            <Route exact path='/planets' element={<Planets data={planets} />} />
          </Routes>
          )}
        </Container>
      </Router>
    </>
  );
}

export default App;
