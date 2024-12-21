import { useState } from "react";
import "./App.css";
import glossedData from "./ch1.json";

interface GlossedWord {
  latin: string;
  latinPlain: string;
  meaning: string;
  gloss: string;
  stemMeaning: string;
}

interface GlossedSentence {
  id: string;
  latinSource: string;
  translation: string;
  words: GlossedWord[];
}

interface GlossedParagraph {
  id: number;
  sentences: GlossedSentence[];
}

interface GlossedText {
  paragraphs: GlossedParagraph[];
}

function App() {
  const [showHyphens, setShowHyphens] = useState(true);
  const [showGloss, setShowGloss] = useState(true);
  const [showMeaning, setShowMeaning] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showLatinSentence, setShowLatinSentence] = useState(true);

  return (
    <div className="container">
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={showHyphens}
            onChange={(e) => setShowHyphens(e.target.checked)}
          />
          hyphens
        </label>
        <label>
          <input
            type="checkbox"
            checked={showMeaning}
            onChange={(e) => setShowMeaning(e.target.checked)}
          />
          word meanings
        </label>
        <label>
          <input
            type="checkbox"
            checked={showGloss}
            onChange={(e) => setShowGloss(e.target.checked)}
          />
          grammatical glosses
        </label>
        <label>
          <input
            type="checkbox"
            checked={showLatinSentence}
            onChange={(e) => setShowLatinSentence(e.target.checked)}
          />
          complete Latin sentence
        </label>
        <label>
          <input
            type="checkbox"
            checked={showTranslation}
            onChange={(e) => setShowTranslation(e.target.checked)}
          />
          translations
        </label>
      </div>

      <div className="glossed-text">
        {glossedData.paragraphs.map((paragraph) => (
          <div key={paragraph.id} className="paragraph">
            <div className="paragraph-number">({paragraph.id})</div>
            {paragraph.sentences.map((sentence) => (
              <div key={sentence.id} className="sentence">
                <div className="sentence-number">{sentence.id}</div>
                <div className="sentence-content">
                  {sentence.words.map((word, idx) => (
                    <div key={idx} className="word-column">
                      <div className="latin-word">
                        {showHyphens ? word.latin : word.latinPlain}
                      </div>
                      {showMeaning && (
                        <div className="stem-meaning">{word.stemMeaning}</div>
                      )}
                      {showGloss && (
                        <div className="gloss-word">{word.gloss}</div>
                      )}
                      {showMeaning && (
                        <div className="meaning-word">{word.meaning}</div>
                      )}
                    </div>
                  ))}
                </div>
                {showLatinSentence && (
                  <div className="latin-sentence">{sentence.latinSource}</div>
                )}
                {showTranslation && (
                  <div className="translation">{sentence.translation}</div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
