import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

function HotelForm() {
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: '',
    disponibilite: true, // booléen par défaut
  });
  const [file, setFile] = useState(null);

  // Gère les champs texte/checkbox
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Gère le fichier image sélectionné
  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      let imageUrl = '';

      // Upload image si fichier sélectionné
      if (file) {
        const imageData = new FormData();
        imageData.append('image', file);

        const uploadRes = await axios.post('http://localhost:5000/api/hotels/upload', imageData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.imageUrl;
      }

      // Préparation données à envoyer
      const hotelData = {
        nom: formData.nom,
        description: formData.description,
        prix: Number(formData.prix),           // convertir en nombre
        disponibilite: formData.disponibilite, // booléen depuis checkbox
        image: imageUrl,
      };

      await axios.post('http://localhost:5000/api/hotels', hotelData);
      alert("✅ Hôtel enregistré avec succès !");
      setFormData({ nom: '', description: '', prix: '', disponibilite: true });
      setFile(null);
    } catch (error) {
      console.error("Erreur : ", error.response?.data || error.message);
      alert("Erreur lors de l’enregistrement de l’hôtel");
    }
  };

  return (
    <FormContainer>
      <h2>Ajouter un Hôtel</h2>
      <form onSubmit={handleSubmit}>
        <Input name="nom" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
        <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required/>
        <Input name="prix" type="number" placeholder="Prix" value={formData.prix} onChange={handleChange} required />
        <label> Disponibilité :{' '}
          <input type="checkbox" name="disponibilite" checked={formData.disponibilite} onChange={handleChange} />
        </label>
        <Input type="file" accept="image/*" onChange={handleFileChange} required />
        <Button type="submit">Enregistrer un hôtel</Button>
      </form>
    </FormContainer>
  );
}

export default HotelForm;