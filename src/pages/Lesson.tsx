import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { financialCourse, getUserProgress, saveUserProgress, Question, Lesson as LessonType } from "@/data/financialCourse";
import { ArrowLeft, CheckCircle, XCircle, Award, Clock, Book } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Lesson = () => {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState<'content' | 'quiz'>('content');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [quizResults, setQuizResults] = useState<{questionId: string, correct: boolean, userAnswer: string}[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [lesson, setLesson] = useState<LessonType | null>(null);

  useEffect(() => {
    // Find the lesson
    for (const unit of financialCourse) {
      const foundLesson = unit.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        setLesson(foundLesson);
        break;
      }
    }
  }, [lessonId]);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center p-3 sm:p-6">
        <div className="text-center w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Lesson not found</h1>
          <Button onClick={() => navigate('/lessons')}>Back to Lessons</Button>
        </div>
      </div>
    );
  }

  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const quizProgress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    setCurrentQuestionIndex(0);
    setQuizResults([]);
    setSelectedAnswer('');
    setShowExplanation(false);
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer.trim()) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    setQuizResults(prev => [...prev, {
      questionId: currentQuestion.id,
      correct: isCorrect,
      userAnswer: selectedAnswer
    }]);

    setShowExplanation(true);

    toast({
      title: isCorrect ? "Correct!" : "Incorrect",
      description: isCorrect ? `+${currentQuestion.points} XP` : "Better luck next time!",
      variant: isCorrect ? "default" : "destructive",
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
      setShowExplanation(false);
    } else {
      completeLesson();
    }
  };

  const completeLesson = () => {
    const progress = getUserProgress();
    const correctAnswers = quizResults.filter(r => r.correct).length;
    const totalPoints = lesson.questions.reduce((sum, q) => sum + q.points, 0);
    const earnedPoints = quizResults.reduce((sum, result) => {
      const question = lesson.questions.find(q => q.id === result.questionId);
      return sum + (result.correct ? (question?.points || 0) : 0);
    }, 0);

    // Update progress
    if (!progress.completedLessons.includes(lesson.id)) {
      progress.completedLessons.push(lesson.id);
      progress.totalXP += earnedPoints;
      progress.currentStreak += 1;
      progress.lastStudyDate = new Date().toISOString();
      
      // Unlock next lesson
      unlockNextLesson(lesson.id);
    }

    saveUserProgress(progress);

    toast({
      title: "Lesson Complete!",
      description: `You earned ${earnedPoints} XP and got ${correctAnswers}/${totalQuestions} questions correct!`,
    });

    setTimeout(() => {
      navigate('/lessons');
    }, 2000);
  };

  const unlockNextLesson = (completedLessonId: string) => {
    // Simple logic to unlock the next lesson in sequence
    for (const unit of financialCourse) {
      const lessonIndex = unit.lessons.findIndex(l => l.id === completedLessonId);
      if (lessonIndex !== -1) {
        // Unlock next lesson in same unit
        if (lessonIndex + 1 < unit.lessons.length) {
          unit.lessons[lessonIndex + 1].isUnlocked = true;
        } else {
          // Unlock first lesson of next unit
          const unitIndex = financialCourse.findIndex(u => u.id === unit.id);
          if (unitIndex + 1 < financialCourse.length) {
            financialCourse[unitIndex + 1].lessons[0].isUnlocked = true;
          }
        }
        break;
      }
    }
  };

  const renderQuestionContent = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'true-false':
        return (
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {['True', 'False'].map((option) => (
              <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-accent/50 transition-colors">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <p className="text-lg">{currentQuestion.question}</p>
            <Input
              placeholder="Type your answer here..."
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="text-lg p-4"
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (currentStep === 'content') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/lessons')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lessons
            </Button>
          </div>

          {/* Lesson Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-3xl">
                    {lesson.icon}
                  </div>
                  <div>
                    <CardTitle className="text-3xl">{lesson.title}</CardTitle>
                    <p className="text-lg text-muted-foreground">{lesson.description}</p>
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{lesson.estimatedTime} min</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>+{lesson.xpReward} XP</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Lesson Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Lesson Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {lesson.content.split('\n').map((paragraph, index) => {
                  if (paragraph.trim() === '') return null;
                  
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">
                        {paragraph.slice(2, -2)}
                      </h3>
                    );
                  }
                  
                  if (paragraph.startsWith('- ')) {
                    return (
                      <li key={index} className="ml-6 mb-2">
                        {paragraph.slice(2)}
                      </li>
                    );
                  }
                  
                  return (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Start Quiz Button */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <h3 className="text-xl font-semibold">Ready to test your knowledge?</h3>
                <p className="text-muted-foreground">
                  Complete the quiz to earn XP and finish this lesson
                </p>
                <Button size="lg" onClick={handleStartQuiz} className="bg-primary hover:bg-primary/90">
                  Start Quiz ({totalQuestions} questions)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-3 sm:p-6 max-w-3xl mx-auto w-full">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Quiz Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => setCurrentStep('content')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Content
          </Button>
          <Badge variant="secondary">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Quiz Progress</span>
            <span>{Math.round(quizProgress)}%</span>
          </div>
          <Progress value={quizProgress} className="h-3" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestion.type !== 'fill-blank' && currentQuestion.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {renderQuestionContent()}

            {!showExplanation ? (
              <Button 
                onClick={handleSubmitAnswer} 
                disabled={!selectedAnswer.trim()}
                className="w-full"
                size="lg"
              >
                Submit Answer
              </Button>
            ) : (
              <div className="space-y-4">
                {/* Result */}
                <div className={`p-4 rounded-lg flex items-center gap-3 ${
                  selectedAnswer === currentQuestion.correctAnswer 
                    ? 'bg-green-50 border border-green-200 dark:bg-green-950/20' 
                    : 'bg-red-50 border border-red-200 dark:bg-red-950/20'
                }`}>
                  {selectedAnswer === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-semibold text-green-700">Correct!</p>
                        <p className="text-sm text-green-600">+{currentQuestion.points} XP</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-6 w-6 text-red-600" />
                      <div>
                        <p className="font-semibold text-red-700">Incorrect</p>
                        <p className="text-sm text-red-600">
                          Correct answer: {currentQuestion.correctAnswer}
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Explanation */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-950/20">
                  <p className="font-semibold text-blue-700 mb-2">Explanation:</p>
                  <p className="text-blue-600">{currentQuestion.explanation}</p>
                </div>

                {/* Next Button */}
                <Button onClick={handleNextQuestion} className="w-full" size="lg">
                  {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Complete Lesson'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Lesson;
