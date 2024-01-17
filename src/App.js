import './App.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './data.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';

import Detail from './routes/Detail.js';

function App() {
  let [shoes, setShoes] = useState(data);
  console.log(shoes);

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/'>Navbar</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/about'>About</Nav.Link>
            <Nav.Link href='/features'>Features</Nav.Link>
            <Nav.Link href='/pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path='/'
          element={
            <div>
              <div className='main-bg'>{/* <img src='/bg.png' /> */}</div>
              <div className='container'>
                <div className='row'>
                  {shoes.map(function (a, i) {
                    return <Card shoes={shoes[i]} i={i + 1} key={i} />;
                  })}
                </div>
              </div>
            </div>
          }
        />
        <Route
          path='/about'
          element={
            <div>
              어바웃페이지임<Outlet></Outlet>
            </div>
          }
        >
          <Route path='member' element={<div>멤버들</div>} />
          <Route path='location' element={<div>회사위치</div>} />
        </Route>
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='*' element={<div>없는페이지임</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`}
        width='80%'
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
    </div>
  );
}

export default App;
