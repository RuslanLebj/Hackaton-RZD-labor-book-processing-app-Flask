export interface BookType {
  name?: string
  number?: string
  patronymic?: string
  series?: string
  surname?: string
  id: number,

  birth_year?: string,
  document_issue_date?: string
  document_issuer?: string
  document_number?: string
  document_series?: string
  document_type?: string

  awards: {
    id: number
    employee_id: number
    awards_information?: string
    date?: string
    order_number?: string
    seal_decryption?: string
  }[]
  jobs: {
    admission_date?: string
    dismissal_date?: string
    employee_id: number
    id: number
    order_number?: string
    position_decryption?: string
    seal_decryption?: string
  }[]
}