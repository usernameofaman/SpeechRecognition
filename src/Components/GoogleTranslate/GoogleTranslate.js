import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DetectAndTranslate = () => {
  const [text, setText] = useState('');
  const [detectedLanguage, setDetectedLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [languages, setLanguages] = useState([]);
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

  useEffect(() => {
    axios
      .get(`https://translation.googleapis.com/language/translate/v2/languages?key=${translationApiKey}`)
      .then((response) => {
        setLanguages(response.data.data.languages);
      })
      .catch((error) => console.error('Error fetching languages:', error));
  }, []);



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
        setDetectedLanguage(language);
      })
      .catch((error) => console.error('Error detecting language:', error));
  };

  const translateText = () => {
    axios
      .post(
        `https://translation.googleapis.com/language/translate/v2?key=${translationApiKey}`,
        {
          q: text,
          target: selectedLanguage, 
        }
      )
      .then((response) => {
        const translation = response.data.data.translations[0].translatedText;
        setTranslatedText(translation);
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
          <option  key={language.language} value={language.language}>
            {language.language}
          </option>
        ))}
      </select>
      <button onClick={translateText}>Translate</button>
      <p>Detected Language: {detectedLanguage}</p>
      <p>Translated Text: {translatedText}</p>
    </div>
  );
};

export default DetectAndTranslate;
