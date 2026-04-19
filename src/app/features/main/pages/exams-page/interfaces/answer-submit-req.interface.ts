export interface AnswerSubmitReq {
    examId: string
    answers: AnswerForSubmit[]
}

export interface AnswerForSubmit {
    questionId: string
    answerId: string
}
