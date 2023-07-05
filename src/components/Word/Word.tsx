import React from "react";
import { useState, useEffect } from "react";

const wordList = [
  {
    englishWord: "apple",
    georgianTranslation: "ვაშლი",
    exampleSentence: "I ate an apple today.",
  },
  {
    englishWord: "house",
    georgianTranslation: "სახლი",
    exampleSentence: "She lives in a beautiful house.",
  },
  {
    englishWord: "car",
    georgianTranslation: "მანქანა",
    exampleSentence: "He drives a fast car.",
  },
  {
    englishWord: "cat",
    georgianTranslation: "კატა",
    exampleSentence: "The cat is sleeping on the sofa.",
  },
  {
    englishWord: "book",
    georgianTranslation: "წიგნი",
    exampleSentence: "I love reading books.",
  },
  {
    englishWord: "sun",
    georgianTranslation: "მზე",
    exampleSentence: "The sun is shining brightly.",
  },
  {
    englishWord: "tree",
    georgianTranslation: "ხე",
    exampleSentence: "The bird is perched on a tree.",
  },
  {
    englishWord: "friend",
    georgianTranslation: "მეგობარი",
    exampleSentence: "I'm meeting my friend for dinner.",
  },
  {
    englishWord: "water",
    georgianTranslation: "წყალი",
    exampleSentence: "Please bring me a glass of water.",
  },
  {
    englishWord: "music",
    georgianTranslation: "მუსიკა",
    exampleSentence: "I enjoy listening to music.",
  },
];

function Word() {
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(wordList[0].englishWord);
  const [translation, setTranslation] = useState(
    wordList[0].georgianTranslation
  );
  const [exampleSentence, setExampleSentence] = useState(
    wordList[0].exampleSentence
  );

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    const index = Math.floor(
      (Number(new Date(currentDate)) - Number(new Date("01/01/2023"))) /
        (1000 * 60 * 60 * 24)
    );
    updateWordOfTheDay(index);
  }, []);

  const updateWordOfTheDay = (index: any) => {
    const wordIndex = index % wordList.length;
    setWordIndex(wordIndex);
    setWord(wordList[wordIndex].englishWord);
    setTranslation(wordList[wordIndex].georgianTranslation);
    setExampleSentence(wordList[wordIndex].exampleSentence);
  };
  return (
    <div className="w-md bg-blue-400  mx-auto p-10">
      <h2>დღის სიტყვა</h2>
      <p>{word}</p>
      <p>{translation}</p>
      <p>{exampleSentence}</p>
    </div>
  );
}

export default Word;
