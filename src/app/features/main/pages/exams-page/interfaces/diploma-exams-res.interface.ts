export interface DiplomaExamsRes {
  status: boolean
  code: number
  payload: Payload
}

export interface Payload {
  data: Exam[]
  metadata: Metadata
}

export interface Exam {
  id: string
  title: string
  description: string
  image: string
  duration: number
  diplomaId: string
  immutable: boolean
  createdAt: string
  updatedAt: string
  diploma: Diploma
  questionsCount: number
}

export interface Diploma {
  id: string
  title: string
}

export interface Metadata {
  page: number
  limit: number
  total: number
  totalPages: number
}
