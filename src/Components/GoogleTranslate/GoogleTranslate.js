import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TranslationService } from '../../services';

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

  const handleTextChange = (event) => {
    const newText = event.target.value;
    setText(newText);
    detectLanguage(newText);
  };

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };


  console.log(languages)
  const getTranslateToken = async () => {
    try {
      // Call the service to obtain the token
      const response = await TranslationService.getToken();
  
      // Store the response data (token) in localStorage
      localStorage.setItem('translationToken', response.data.token);
    } catch (error) {
      console.error('Error obtaining translation token:', error);
    }
  };

  
  useEffect(() => {
    // Call the getTranslateToken function when the component mounts
    getTranslateToken();
  }, []);
  
  const detectLanguage = (inputText) => {
    axios
      .post(
        `https://translation.googleapis.com/language/translate/v2/detect?key=`,
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
      `${apiUrl}`,
      {
        "contents": [text],
        "sourceLanguageCode": detectLanguage,
        "targetLanguageCode": selectedLanguage,
        "transliterationConfig": {
          "enableTransliteration": true
        },
        "mimeType": "text/plain"
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('translationToken')}`
        }
      }
    )
      .then((response) => {
        console.log(response)
        // setTranslatedText(translation);
      })
      .catch((error) => console.error('Error translating text:', error));
  };

  // const translateText = async () => {
  //   try {
  //     const requestData = {
  //       contents: [text], // Assuming 'text' is defined elsewhere
  //       sourceLanguageCode: detectedLanguage, // Assuming 'detectedLanguage' is defined elsewhere
  //       targetLanguageCode: selectedLanguage, // Assuming 'selectedLanguage' is defined elsewhere
  //       transliterationConfig: {
  //         enableTransliteration: true,
  //       },
  //       mimeType: "text/plain",
  //     };
  
  //     // Call the translateAPI function to make the translation request
  //     const response = await TranslationService.translateAPI(requestData);
  
  //     // Handle the response as needed
  //     console.log('Translation Response:', response);
  //   } catch (error) {
  //     console.error('Error in translateText:', error.message);
  //     // Handle the error as needed
  //   }
  // };
  

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
