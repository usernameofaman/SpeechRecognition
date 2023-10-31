import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetectAndTranslate = () => {
  const [text, setText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [languages, setLanguages] = useState([
    { language: "hi" }, // Hindi
    { language: "en" }, // English
    { language: "bn" }, // Bengali
    { language: "te" }, // Telugu
    { language: "mr" }, // Marathi
    { language: "ta" }, // Tamil
    { language: "ur" }, // Urdu
    { language: "gu" }, // Gujarati
    { language: "ml" }, // Malayalam
    { language: "kn" }, // Kannada
    { language: "or" }, // Odia
    { language: "pa" }, // Punjabi
    { language: "as" }, // Assamese
    { language: "mai" }, // Maithili
    { language: "sat" }, // Santali
    { language: "ne" }, // Nepali
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState('en'); // Default language code

  console.log(selectedLanguage, "SL")
  const translationApiKey = 'AIzaSyBH0M47tuBYEhawRx3elTKjHNuw4eEuBNg';

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    detectLanguage(newText);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  console.log(languages)

  const detectLanguage = (inputText) => {
    axios
      .post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${translationApiKey}`,
        {
          q: inputText,
        }
      )
      .then((response) => {
        const language = response.data.data.detections[0][0].language;
        console.log(response)
        setDetectedLanguage(language);
      })
      .catch((error) => console.error('Error detecting language:', error));
  };
  const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'; 
  const apiUrl = 'https://translate.googleapis.com/v3/projects/prj-bootstrap-grnarsoft1:translateText';

  const translateText = () => {
    axios.post(
      `${corsProxyUrl}${apiUrl}`,
      {
        "contents": [
          "kem chho"
        ],
        "sourceLanguageCode": "gu",
        "targetLanguageCode": "en",
        "transliterationConfig": {
          "enableTransliteration": true
        },
        "mimeType": "text/plain"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ya29.c.c0AY_VpZg_HKm_sT4Mlk1Sy7TQHiwPRVAnBh7b6fG3DU9JNhYdjtw37w9KagCoRaJG1DksNtYxk0rpztavAjlfDM4XxE_cvothmAVZT9tHvDQyRifCK5DLt09BGkv145mbIxplJCRinx6HdP1dyvXPhKHSYQN2qoYBJ8AxrOt3FgE96Tuix0FDiWnqVWDo1tdZSpUolbdNSnREeO6Exbt5xUYnitl9Og1lOvS8-OzYi5FcvjmTfrXO9SjhJoqmm2WK0Ux0QuYKsWrK0ycLBLBnsGLiut5gKB-LYI7nRHyc_URE3IwnxrmJHB_nEuNT5VfD4DnMBXa_4j4qZSMs5-e0VR4udRTDtJIUeBqREXfTfGaCpiphi_n13xuGYSHtS2pAvuRSqQE399AaS2SV-30WJ9aWMpvhXlXwYImZVpmgXYJ6dZixdpeQo5WvQydvYJ0qs-BOecajYFwgygeFziwiWMspcQWQtvjycMV0ZjcqF48W0mI6i6nYM40zk-xq3qe3cebwRik3vxSwSJ08si651kmknQbyMQJcegXQ-Y8o_bfQb7hBaIqtkXv0vXXY0hwmY0Zxg5yJ90nIiMR19c3pjd6BBrBw6Qk3Rt9Ylte7UJSkOtqsMUuOef97l63g53g2d93MnJZ7Q7u5pZaMnav2h5_qUlSXd-g1ZeQeni0rz32sUktpXaBwjxugRUs2wzceJe8Ri27va00dFRS35quJqXJrYiYc5RkphIxoXzoi9d2qprXR0zjygqn4Sdpjbrf34OmhV_4_f3n0RrqgkkIMtxcFMp4k_IZcfuZszjmXzh9FYkIek3gaviIuhWy4tUSdJgjJ8ZMjqz8x96fz-vInnQ7B9smwzZa9VYS5q8zx9BF29QBknVoqIlcon7JW-64Ou9Qp3RckUzUbOWaV348Ul1bxzpsRoS-4S8lUdaaRybd7pXZo_Othh1bZ9SmQXXaM6Mp22ffeinrmqY4v9W7QUvn8_VQRyeBoMtqeWiXXyoS_qF25Mvd2wmk`
        }
      }
    )
      .then((response) => {
        console.log(response)
        // setTranslatedText(translation);
      })
      .catch((error) => console.error('Error translating text:', error));
  };

  return (
    <div>
      <h1>Language Detection and Translation</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter text to detect language and translate"
        value={text}
        onChange={handleTextChange}
      ></textarea>
      <br />
      <select
        value={selectedLanguage} onChange={handleLanguageChange}>
        {languages.map((language) => (
          <option key={language.language} value={language.language}>
            {language.language}
          </option>
        ))}
      </select>
      <button onClick={translateText}>Translate</button>
      <p>Detected Language: {detectedLanguage}</p>
      <div dangerouslySetInnerHTML={{ __html: translatedText }} />
    </div>
  );
};

export default DetectAndTranslate;
