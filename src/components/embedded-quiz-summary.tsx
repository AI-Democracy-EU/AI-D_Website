import React from 'react';
import { useLocalQuiz } from '@/contexts/quiz-context';

function LocalEmbeddedQuizSummary() {
  const { correctAnswers, userAnswers, quizData } = useLocalQuiz();
  const totalQuestions = quizData.length;

  return (
    <div className="mx-auto flex h-full w-full max-w-md flex-col p-4">
      <h1 className="mb-2 text-center text-2xl font-bold text-cableBlack">Quiz Summary</h1>
      <div className="mb-2 flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600">Your Score</p>
          <p className="text-3xl font-bold text-cableBlack">
            {correctAnswers}
            <span className="text-gray-400">/ {totalQuestions}</span>
          </p>
        </div>
      </div>

      <div className="mb-4 h-2 w-full rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-purple-500"
          style={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
        />
      </div>

      <div className="flex-grow overflow-auto">
        <table className="w-full text-sm text-cableBlack">
          <thead>
            <tr>
              <th className="py-1 text-left">No.</th>
              <th className="py-1 text-left">Q&A</th>
              <th className="py-1 text-left">Your Answer</th>
            </tr>
          </thead>
          <tbody>
            {userAnswers.map((answer, i) => (
              <tr key={i} className="border-b">
                <td className="py-1">{i + 1}</td>
                <td className="py-1">
                  <p className="font-medium">{quizData[i].text}</p>
                  <p className="text-xs text-gray-600">{quizData[i].correctAnswer}</p>
                </td>
                <td
                  className={`py-1 ${
                    answer.userAnswers === quizData[i].correctAnswer
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {answer.userAnswers}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LocalEmbeddedQuizSummary;
