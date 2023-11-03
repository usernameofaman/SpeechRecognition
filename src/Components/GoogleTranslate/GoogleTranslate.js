import axios from "axios";
import { TranslationService } from "../../services";

const getTranslateToken = async () => {
  try {
    // Call the service to obtain the token
    const response = await TranslationService.getToken();
    // Store the response data (token) in localStorage
    localStorage.setItem("translationToken", response.Token);
  } catch (error) {
    console.error("Error obtaining translation token:", error);
  }
};

const detectLanguage = async (inputText) => {
  await getTranslateToken();
  const accessToken = localStorage.getItem("translationToken");

  try {
    // Detect language using Google Translation API
    const response = await axios.post(
      `https://translation.googleapis.com/v3/projects/prj-bootstrap-grnarsoft1/locations/global:detectLanguage`,
      {
        content: inputText,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract and return the detected language code
    const detectedLanguage = response.data.languages[0].languageCode;
    return detectedLanguage;
  } catch (error) {
    console.error("Error detecting language:", error);
    throw error;
  }
};

const translateToEnglish = async (inputText, sourceLanguageCode) => {
  await getTranslateToken();
  const accessToken = localStorage.getItem("translationToken");

  try {
    // Translate text to English using Google Translation API
    const response = await axios.post(
      `https://translate.googleapis.com/v3/projects/prj-bootstrap-grnarsoft1:translateText`,
      {
        contents: [inputText],
        sourceLanguageCode: sourceLanguageCode,
        targetLanguageCode: "en",
        transliterationConfig: {
          enableTransliteration: true,
        },
        mimeType: "text/plain",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    // Extract and return the translated text
    const translatedText = response.data.translations[0].translatedText;
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    throw error;
  }
};

export { detectLanguage, translateToEnglish };
