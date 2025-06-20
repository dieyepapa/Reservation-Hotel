/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import HotelForm from './HotelForm';

const Container = styled.div`
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  margin: 0;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
`;

const TopRightArea = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
`;

const AddHotelButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #2980b9;
  }
`;

const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const HotelCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  text-align: center;
`;

const HotelImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false); // Toggle pour affichage exclusif

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(response => setHotels(response.data))
      .catch(error => console.error("Erreur lors de la récupération des hôtels :", error));
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container>
      <Header>
        <Title>{showForm ? 'Ajouter un Hôtel' : 'Liste des Hôtels'}</Title>
        {!showForm && (
          <SearchInput
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}
      </Header>

      <TopRightArea>
        <AddHotelButton onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Retour à la liste' : '+ Créer un nouveau hôtel'}
        </AddHotelButton>
      </TopRightArea>

      {showForm ? (
        <HotelForm />
      ) : (
        <HotelGrid>
          {filteredHotels.map(hotel => (
            <HotelCard key={hotel._id}>
              <HotelImage src={hotel.image || hotel.photo} alt={hotel.nom} />
              <p style={{ color: 'brown' }}>{hotel.description}</p>
              <h3>{hotel.nom}</h3>
              <p>{hotel.prix} FCFA</p>
            </HotelCard>
          ))}
        </HotelGrid>
      )}
    </Container>
  );
}

export default ListeHotel;

*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 30px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const NotificationWrapper = styled.div`
  position: relative;
`;

const NotificationCount = styled.span`
  position: absolute;
  top: -6px;
  right: -6px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 50%;
`;

const ProfileWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const OnlineDot = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  background: green;
  border: 2px solid white;
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 30px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CreateButton = styled.button`
  padding: 10px 20px;
 
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

const HotelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const HotelCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  text-align: center;
`;

const HotelImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
`;

function ListeHotel() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/hotels')
      .then(response => setHotels(response.data))
      .catch(error => console.error("Erreur lors de la récupération des hôtels :", error));
  }, []);

  const filteredHotels = hotels
    .filter(hotel => hotel.nom.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 8);

  return (
    <Container>
      <TopBar>
        <SearchInput type="text" placeholder="🔍 Rechercher un hôtel..." value={search} onChange={e => setSearch(e.target.value)} />
        <NotificationWrapper>
          <span style={{ fontSize: '24px' }}>🔔</span>
          <NotificationCount>3</NotificationCount>
        </NotificationWrapper>

        <ProfileWrapper>
          <ProfileImg src="https://i.pravatar.cc/40" alt="profil" />
          <OnlineDot />
        </ProfileWrapper>

        <span style={{ fontSize: '20px' }}>➡️</span>
      </TopBar>

      <SearchContainer>
        <CreateButton onClick={() => window.location.href = '/'}>
          <p style={{ color: 'black' }}>+ Créer un nouveau hôtel</p>
        </CreateButton>
      </SearchContainer>

      <HotelGrid>
        {filteredHotels.map(hotel => (
          <HotelCard key={hotel._id}>
            <HotelImage src={hotel.image} alt={hotel.nom} />
            <p style={{ color: 'brown' }}>{hotel.description}</p>
            <h3>{hotel.nom}</h3>
            <p>{hotel.prix} XOF par nuit</p>
          </HotelCard>
        ))}
      </HotelGrid>
    </Container>
  );
}

export default ListeHotel;