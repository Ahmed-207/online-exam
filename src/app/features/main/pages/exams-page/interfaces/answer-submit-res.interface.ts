export interface AnswerSubmitRes {
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
    submittedAt: string
}

export interface Analytic {
    questionId: string
    questionText: string
    selectedAnswer: AnswerRes
    isCorrect: boolean
    correctAnswer: AnswerRes
}


export interface AnswerRes {
    id: string
    text: string
}
