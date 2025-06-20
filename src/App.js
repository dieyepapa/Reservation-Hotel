import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HotelForm from './components/HotelForm';
import ListeHotel from './components/ListeHotel';
import styled from 'styled-components';

const Sidebar = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 200px;
  height: 100vh;
  background-color: #2c3e50;
  padding: 20px;
`;

const SidebarLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;
  margin-bottom: 20px;
`;

const MainContent = styled.div`
  margin-left: 220px;
  padding: 20px;
`;

function App() {
  return (
    <Router>
      <Sidebar>
        <h1> Dashbord</h1>
        <SidebarLink to="/liste">Liste des hôtels</SidebarLink>
      </Sidebar>
      <MainContent>
        <Routes>
          <Route path="/" element={<HotelForm />} />
          <Route path="/liste" element={<ListeHotel />} />
        </Routes>
      </MainContent>
    </Router>
  );
}

export default App;