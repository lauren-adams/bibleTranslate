import React, { useState } from 'react';
import translateText from './GoogleTranslate';
import CompareWord from './WordnetFrontendpoint';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import WordSelector from "./WordSelector";
import translateTextM from "./ModelTranslate";

function App() {
  const [inputText, setInputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('Set input language'); // Default: English
  const [targetLanguage, setTargetLanguage] = useState('Set output language'); // Default: Spanish
  const [translatedText, setTranslatedText] = useState('');
  const [showWordSelector, setShowWordSelector] = useState(false); // State to control modal visibility

  const handleTranslate = async () => {
    if (inputText && inputLanguage !== targetLanguage) {
     // if (targetLanguage === "cmn") {
        const text = await translateTextM(inputText, inputLanguage, targetLanguage);
        setTranslatedText(text);
        console.log(text);
      //} else {
      //  const text = await translateText(inputText, targetLanguage);
      //  setTranslatedText(text);
      //  console.log(text);
     // }
    } else {
      // Input and target languages are the same, or input text is empty.
      // Handle this case as needed.
    }
  };

  const languageOptions = {
    spa: 'Spanish',
    eng: 'English',
    fra: 'French',
    cmn: 'Mandarin Chinese',
  };

  const languageCodeMap = {
    es: 'spa',
    en: 'eng',
    fr: 'fra',
    'Mandarin Chinese': 'cmn',
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleTargetChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  const toggleWordSelector = () => {
    setShowWordSelector(!showWordSelector);
  };

  const wordSelectorData = {
    inputText: inputText,
    translatedText: translatedText,
    targetLang: targetLanguage,
  };

  return (
    <div className="App">
      <h1 className="text-success">SIC'EM NLP</h1>
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                value={inputText}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="input-group">
              <select
                className="form-select"
                aria-label="Default select example"
                value={inputLanguage}
                onChange={(e) => setInputLanguage(e.target.value)}
              >
                <option>Select input language</option>
                {Object.entries(languageOptions).map(([code, language]) => (
                  <option key={code} value={code}>
                    {language}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                aria-label="Default select example"
                value={targetLanguage}
                onChange={handleTargetChange}
              >
                <option>Select translation language</option>
                {Object.entries(languageOptions).map(([code, language]) => (
                  <option key={code} value={code}>
                    {language}
                  </option>
                ))}
              </select>
              <button
                className="btn btn-primary"
                onClick={handleTranslate}
              >
                Translate
              </button>

            </div>
            <p></p>
            <h4>Translation Tools:</h4>


            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={toggleWordSelector}>
              WordNet
            </button>
            <p>If any of the words selected by the model are unsatisfactory, wordnet generates similar words and the degrees of similarity to original word. This is limited to English translations. </p>

          </div>
          <div className="col s12 m6">
            <div className="form-group">
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                value={translatedText}
              ></textarea>
            </div>
          </div>
        </div>
      </div>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">WordNet</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <WordSelector data={wordSelectorData}></WordSelector>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

