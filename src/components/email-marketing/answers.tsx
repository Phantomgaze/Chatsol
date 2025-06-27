import { useAnswers } from '@/hooks/email-marketing/use-marketing'
import React, { useMemo } from 'react'
import { Loader } from '../loader'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type QuestionItemProps = {
  question: string;
  answer: string | null;
}

const QuestionItem = React.memo(({ question, answer }: QuestionItemProps) => (
  <Card className="mb-4">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg font-medium">{question}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{answer || 'No answer provided'}</p>
    </CardContent>
  </Card>
));

QuestionItem.displayName = 'QuestionItem';

type AnswersProps = {
  id?: string;
};

const Answers = React.memo(({ id }: AnswersProps) => {
  const { answers, loading } = useAnswers(id!);

  const hasAnswers = useMemo(() => {
    return answers.some(answer => 
      answer.customer.some(customer => customer.questions.length > 0)
    );
  }, [answers]);

  const renderContent = useMemo(() => {
    if (loading) return null;

    if (!hasAnswers) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No answers available yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {answers.map((answer, idx) =>
          answer.customer.flatMap((customer, custIdx) =>
            customer.questions.map((question, qIdx) => (
              <QuestionItem 
                key={`${idx}-${custIdx}-${qIdx}`}
                question={question.question}
                answer={question.answered}
              />
            ))
          )
        )}
      </div>
    );
  }, [answers, loading, hasAnswers]);

  return (
    <div className="mt-10">
      <Loader loading={loading}>
        {renderContent}
      </Loader>
    </div>
  );
});

Answers.displayName = 'Answers';

export default Answers;