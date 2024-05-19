import Head from 'next/head'
import Header from '@/components/header/header'
import styles from "@/styles/Home.module.scss";
import { useEffect, useState } from 'react';
import { BookType } from '@/types/book';
import Book from '@/components/book/book';
import Image from 'next/image'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { baseUrl } from '@/baseUrl';
import Spinner from '@/components/spinner/spinner';

export default function Archive() {

  const [activeBook, setActiveBook] = useState<BookType>()

  const [isEditMode, setIsEditMode] = useState(true)

  const [xlsx, setXlsx] = useState<string>()
  const [json, setJson] = useState<string>()

  const params = useParams()

/*   const [books, setBooks] = useState<BookType[]>([
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    },
    {
      "awards": [
        {
          "awards_information": "danil krasava",
          "date": "2222222",
          "employee_id": 1,
          "id": 1,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        },
        {
          "awards_information": "danil krasava22222222222",
          "date": "2222222",
          "employee_id": 1,
          "id": 2,
          "order_number": "2222222222",
          "seal_decryption": "enviro"
        }
      ],
      "birth_year": "2023",
      "document_issue_date": undefined,
      "document_issuer": undefined,
      "document_number": "080808",
      "document_series": "7502",
      "document_type": undefined,
      "id": 1,
      "jobs": [
        {
          "admission_date": "2006",
          "dismissal_date": "2007",
          "employee_id": 1,
          "id": 1,
          "order_number": "123",
          "position_decryption": "programist",
          "seal_decryption": "enviro"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 2,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        },
        {
          "admission_date": "20088888886",
          "dismissal_date": "2888888007",
          "employee_id": 1,
          "id": 3,
          "order_number": "188823",
          "position_decryption": "program888888ist",
          "seal_decryption": "enviro88888"
        }
      ],
      "name": "Pur",
      "number": "123123",
      "patronymic": "Purovich",
      "series": "SI-I",
      "surname": "Purov"
    }
  ]) */

  const [books, setBooks] = useState<BookType[]>()

  const getActiveBook = (index: number) => {
    if (!books){
      return
    }
    console.log(books[index])
    setActiveBook(books[index])
  }

  const handleGetXlsx = async (id: number) => {
    try{
      const {data} = await axios.get<string>(baseUrl + `data/${id}/xlsx`)
      setXlsx(data)
    }catch(error){
      console.log(error)
    }
  }

  const handleGetBooks = async () => {
    try{
      const {data} = await axios.get<BookType[]>(baseUrl + 'all', {
        headers: {
          "accept": "application/json"
        }
      })
      setBooks(data)
      if (params.id){
        setActiveBook(data.filter((book)=>(book.id === parseInt(params.id as string)))[0])
        const jsonStr = JSON.stringify(data.filter((book)=>(book.id === parseInt(params.id as string)))[0]);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        setJson(URL.createObjectURL(blob));
        handleGetXlsx(parseInt(params.id as string))
      }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    handleGetBooks()
  },[])

  if (!books){
    return <Spinner/>
  }

  return (
    <>
      <Head>
        <title>AIWorkLog Converter</title>
        <meta name="description" content="AIWorkLog Converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.main__results}>
            {!activeBook ? <>
              <h2 className={styles.results__title}>Архив обработанных книг</h2>
              <div className={styles.results__books}>
                {books.map((book, index) => (
                  <Book content={book} onClickBook={()=>{getActiveBook(index)}} isReadOnly key={`${book.id}--${index}`} />
                ))}
              </div>
            </> : 
              <>
                <h2 className={styles.results__title}>Редактирование/Выгрузка книги</h2>
                <div className={styles.results__selectMode}>
                  <span onClick={()=>{setIsEditMode(true)}} className={`${styles.results__selectPoint} ${isEditMode ? styles.results__selectPoint_active : styles.results__selectPoint_inactive}`}>Редактирование</span>
                  <span onClick={()=>{setIsEditMode(false)}} className={`${styles.results__selectPoint} ${!isEditMode ? styles.results__selectPoint_active : styles.results__selectPoint_inactive}`}>Скачивание</span>
                </div>
                {isEditMode ? 
                  <Book onSaveBook={()=>{setActiveBook(undefined); handleGetBooks()}} content={activeBook} isReadOnly={false}/> :
                  xlsx && json ? <div className={styles.results__links}>
                    <a href={xlsx} download className={styles.results__result}>
                      <Image src="/icons/excel.svg" width={26} height={26} alt="" />
                      <span className={styles.main__searchSpan}>Excel</span>
                    </a>
                    <a href={json} className={styles.results__result}>
                      <Image src="/icons/json.png" width={26} height={26} alt="" />
                      <span className={styles.main__searchSpan}>JSON</span>
                    </a>
                  </div> : <Spinner/>
                }
              </>
            }
          </div>
        </main>
      </div>
    </>
  )
}