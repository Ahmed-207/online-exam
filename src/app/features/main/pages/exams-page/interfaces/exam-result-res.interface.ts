export interface ExamResultRes {
    status: boolean
    code: number
    payload: Payload
}

export interface Payload {
    submission: Submission
    analytics: Analytic[]
}

export interface Submission {
    id: string
    examId: string
    examTitle: string
    score: number
    totalQuestions: number
    correctAnswers: number
    wrongAnswers: number
    startedAt: string
    submittedAt: string
}

export interface Analytic {
    questionId: string
    questionText: string
    selectedAnswer: AnswerForAnalyse
    isCorrect: boolean
    correctAnswer: AnswerForAnalyse
}

export interface AnswerForAnalyse {
    id: string
    text: string
}

