import countriesApi from './countriesApi';

const quizApi = {
  fetchQuestions: async () => {
    try {
      const countries = await countriesApi.fetchCountries();

      // Generate quiz questions
      const questions = countries.map(country => {
        const question = `What is the capital of ${country.name.common}?`;
        const choices = [country.capital[0], ...getRandomChoices(country.capital[0], countries)];
        const shuffledChoices = shuffleArray(choices);
        return {
          question,
          choices: shuffledChoices,
          answer: country.capital[0]
        };
      });

      return questions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      throw error;
    }
  },
};

function getRandomChoices(correctChoice, allChoices) {
  const randomChoices = [];
  while (randomChoices.length < 3) {
    const randomCountry = allChoices[Math.floor(Math.random() * allChoices.length)];
    if (randomCountry.capital[0] !== correctChoice && !randomChoices.includes(randomCountry.capital[0])) {
      randomChoices.push(randomCountry.capital[0]);
    }
  }
  return randomChoices;
}

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default quizApi;





// import axios from 'axios';

// const countriesApi = {
//   fetchCountries: async () => {
//     try {
//       const response = await axios.get('https://restcountries.com/v3.1/all');
//       if (!response.data || response.data.length === 0) {
//         throw new Error('Failed to fetch countries');
//       }
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching countries:', error);
//       throw error;
//     }
//   },
// };

// export default countriesApi;
