// Імпортуючи useState з бібліотеки React для управління станом у функціональному компоненті
import { useState } from 'react';

// Імпортуючи стилізовані компоненти з вказаних файлів
import { MainContainer } from "./App.styled";
import { Section } from "../Section/Section";
import { FeedbackOptions } from "../FeedbackOptions/FeedbackOptions";
import { Statistics } from "../Statistics/Statistics";
import { Notification } from "../Notification/Notification";

// Визначаємо головний компонент App
export const App = () => {
  // Використання useState для управління станом для зберігання "добрих", "нейтральних" та "поганих" відгуків
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // Функція для обробки натискань кнопок відгуку та оновлення відповідного стану
  const onLeaveFeedback = state => {
    switch (state) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        return;
    }
  };

  // Функція для підрахунку загальної кількості відгуків
  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  // Функція для підрахунку відсотка позитивних відгуків
  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    return Math.round((good / total) * 100) || 0;
  };

  // Створення масиву опцій для відгуків ('good', 'neutral', 'bad')
  const options = Object.keys({ good, neutral, bad });
  // Розрахунок загальної кількості відгуків та відсотка позитивних відгуків
  const totalFeedback = countTotalFeedback();
  const totalPercentage = countPositiveFeedbackPercentage();
    
    return (
      <MainContainer>
        <Section title="Please leave feedback">
          <FeedbackOptions
            onLeaveFeedback={onLeaveFeedback}
            options={options}
        />
        </Section>
        <Section title="Statistics">
          {totalFeedback !== 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={totalPercentage}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </MainContainer>
    );
  
}
