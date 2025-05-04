// import axios from 'axios';

// const BASE_URL = 'http://localhost:5000/api/favorites';  // Adjust this based on your backend URL

// export const addFavorite = async (countryCode) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/add`,
//       { countryCode },
//       { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } } // Assuming token is stored in localStorage
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error adding favorite:', error);
//   }
// };

// export const removeFavorite = async (countryCode) => {
//   try {
//     const response = await axios.delete(
//       `${BASE_URL}/remove`,
//       { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error removing favorite:', error);
//   }
// };
