import { useEffect, useRef, useState } from 'react'
import styles from './book.module.scss'
import { BookType } from '@/types/book'
import axios from 'axios'
import { baseUrl } from '@/baseUrl'

type BookProps = {
  isReadOnly: boolean
  onClickBook?: () => void
  onSaveBook?: () => void
  content: BookType
}

export default function Book({isReadOnly, onClickBook, content, onSaveBook}:BookProps) {

  const [page, setPage] = useState(1)

  const [book, setBook] = useState<BookType>(content)

  const [position, setPosition] = useState({ x: 480, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const allBlocks = useRef<HTMLDivElement>(null)

  const updateBook = (newValue: string, keyName: string, objectKeyName: 'book' | 'jobs' | 'awards', index?: number) => {
    const newBook: any = { ...book };
    switch (objectKeyName) {
      case 'book':
        newBook[keyName as keyof BookType] = newValue;
        break;
      case 'jobs':
        if (index === undefined) {
          return;
        }
        newBook.jobs[index][keyName as keyof typeof newBook.jobs[number]] = newValue;
        break;
      case 'awards':
        if (index === undefined) {
          return;
        }
        newBook.awards[index][keyName as keyof typeof newBook.awards[number]] = newValue;
        break;
    }
    setBook(newBook)
  };

  const returnTable = () => {
    switch (page) {
      case 1:
        return (
          <div className={styles.content}>
            <h1 className={styles.title}>Трудовая книжка</h1>
            <div className={styles.numbers}>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'series', 'book') }} value={book.series} isTable={false} />
              <div style={{ display: 'flex' }}><span>№</span> <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'number', 'book') }} value={book.number} isTable={false} /></div>
            </div>
            <div className={styles.field}>
              <span className={styles.field__name}>Фамилия</span>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'surname', 'book') }} value={book.surname} isTable={false} />
            </div>
            <div className={styles.field}>
              <span className={styles.field__name}>Имя</span>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'name', 'book') }} value={book.name} isTable={false} />
            </div>
            <div className={styles.field}>
              <span className={styles.field__name}>Отчество</span>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'patronymic', 'book') }} value={book.patronymic} isTable={false} />
            </div>
            <div className={styles.field}>
              <span className={styles.field__name}>Год рождения</span>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'birth_year', 'book') }} value={book.birth_year} isTable={false} />
            </div>
            <div className={styles.field}>
              <span className={styles.field__name}>Дата заполнения</span>
              <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'document_issue_date', 'book') }} value={book.document_issue_date} isTable={false} />
            </div>
          </div>
        )
      case 2:
        return (
          <div className={styles.content}>
            <h1 className={styles.title}>Сведения о работе</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th><div className={styles.table__thBlock}>Дата приема</div></th>
                  <th>
                    <div className={`${styles.table__thBlock} ${styles.table__thDate}`}>
                      <p>Дата увольнения</p>
                    </div></th>
                  <th>
                    <div className={styles.table__thBlock}>
                      Расшифровка печати (штампа)
                    </div>
                  </th>
                  <th>
                    <div className={styles.table__thBlock}>
                      Расшифровка должности
                    </div>
                  </th>
                  <th>
                    <div className={styles.table__thBlock}>
                      Приказ (номер и дата)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {book.jobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'admission_date', 'jobs', index) }} value={job.admission_date} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'dismissal_date', 'jobs', index) }} value={job.dismissal_date} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'seal_decryption', 'jobs', index) }} value={job.seal_decryption} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'position_decryption', 'jobs', index) }} value={job.position_decryption} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'order_number', 'jobs', index) }} value={job.order_number} isTable={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 3:
        return (
          <div className={styles.content}>
            <h1 className={styles.title}>Сведения о поощрениях и награждениях</h1>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th><div className={styles.table__thBlock}>Дата</div></th>
                  <th>
                    <div className={`${styles.table__thBlock} ${styles.table__thDate}`}>
                      <p>Расшифровка печати (штампа)</p>
                    </div></th>
                  <th>
                    <div className={styles.table__thBlock}>
                      Расшифровка информации о поощрении и награждении
                    </div>
                  </th>
                  <th>
                    <div className={styles.table__thBlock}>
                      Приказ (номер и дата)
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {book.awards.map((award, index) => (
                  <tr key={award.id}>
                    <td>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'date', 'awards', index) }} value={award.date} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'seal_decryption', 'awards', index) }} value={award.seal_decryption} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'awards_information', 'awards', index) }} value={award.awards_information} isTable={true} />
                    </td>
                    <td className={styles.table__td}>
                      <Field isReadOnly={isReadOnly} onChangeValue={(value: string) => { updateBook(value, 'order_number', 'awards', index) }} value={award.order_number} isTable={true} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  }

  const onChangeBook = async () => {
    try{
      await axios.put(baseUrl + `data/${content.id}/update`, content)
      if (onSaveBook){
        onSaveBook()
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <div onClick={()=>{onClickBook && onClickBook()}} className={`${styles.container} ${isReadOnly ? styles.container_readOnly : undefined}`}>
      {returnTable()}
      {isReadOnly || <div className={styles.pagination}>
        <svg onClick={() => { page !== 1 && setPage(page - 1) }} className={styles.pagination__svg} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.25363 1.16895L1.92969 6.36304L7.25363 11.8168" stroke="white" strokeWidth="1.52113" />
        </svg>
        <div>
          <span onClick={() => { setPage(1) }} className={`${styles.pagination__point} ${ page !== 1 ? styles.pagination__point_inactive : styles.pagination__point_active}`}>1</span>
          <span onClick={() => { setPage(2)  }} className={`${styles.pagination__point} ${ page !== 2 ? styles.pagination__point_inactive : styles.pagination__point_active}`}>2</span>
          <span onClick={() => { setPage(3)  }} className={`${styles.pagination__point} ${ page !== 3 ? styles.pagination__point_inactive : styles.pagination__point_active}`}>3</span>
        </div>
        <svg onClick={() => { page !== 3 && setPage(page + 1) }} className={styles.pagination__svg} width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.746369 1.16895L6.07031 6.36304L0.746369 11.8168" stroke="white" strokeWidth="1.52113" />
        </svg>
      </div>}
      {isReadOnly || <button onClick={onChangeBook} className={styles.save}>Сохранить книгу</button>}
      {isReadOnly || 
        <div 
          style={{
            top: position.y + 'px',
            left: position.x + 'px',
            cursor: dragging ? 'grabbing' : 'grab'
          }}
          ref={allBlocks} 
          onMouseDown={handleMouseDown} 
          onMouseMove={handleMouseMove} 
          onMouseUp={handleMouseUp} 
          className={styles.allWords__container}>
          <h2 className={styles.allWords__title}>Все найденные слова</h2>
          <textarea readOnly className={styles.allWords__textarea}></textarea>
        </div>}
    </div>
  )
}

type FieldProps = {
  value?: string
  onChangeValue: (value: string) => void
  isTable: boolean
  isReadOnly: boolean
}

function Field({ value, onChangeValue, isTable, isReadOnly }: FieldProps) {

  const [isEdit, setIsEdit] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsEdit(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <div>
      {isTable ?
        <div className={styles.fieldInput}>
          {!isEdit ?
            <div onClick={() => {isReadOnly || setIsEdit(true) }} className={styles.table__tdBlock}>{value ? value : '-'}</div> :
            <input ref={inputRef} autoFocus className={styles.table__tdBlock} value={value} onChange={(e) => { onChangeValue(e.target.value) }} type='text' />
          }
        </div> :
        <div className={styles.fieldInput}>
          {!isEdit ?
            <span onClick={() => {isReadOnly ||  setIsEdit(true)}} className={styles.input}>{value ? value : '-'} </span> :
            <input ref={inputRef} autoFocus className={styles.input} value={value} onChange={(e) => { onChangeValue(e.target.value) }} type='text' />
          }
        </div>}
    </div>
  )
}