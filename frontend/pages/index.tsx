import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Image from 'next/image'
import Header from "@/components/header/header";
import { useRef, useState } from "react";
import Spinner from "@/components/spinner/spinner";
import { baseUrl } from "@/baseUrl";
import axios from "axios";
import { useRouter } from "next/router";

export default function Home() {

  const [isUpload, setIsUpload] = useState<boolean>()

  const inputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files){
      return
    }
    console.log(e.target.files)
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    try{
      setIsUpload(false)
      const {data} = await axios.post<number>(baseUrl + 'upload', formData, {
        headers: {
          "accept": "application/json",
          "Content-type": "multipart/form-data"
        }
      })
      if (data){
        router.push({
          pathname: `/archive?id=${data}`
        })
      }
      setIsUpload(true)
    }catch (error){
      console.log(error)
      setIsUpload(undefined)
    }
  }

  const onClickUpload = () => {
    if (inputRef.current){
      inputRef.current.click()
    }
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
          <div className={styles.main__welcome}>
            <h1 className={styles.main__title}>{isUpload === true ? 'Трудовая книжка успешно загружена' : 'Приятно видеть вас снова'}</h1>
            {isUpload === undefined && <button className={styles.main__search}>
              <img src="/icons/stars.svg" width={26} height={26} alt="" />
              <span onClick={onClickUpload} className={styles.main__searchSpan}>Загрузить трудовую книжку (.zip)</span>
              <input ref={inputRef} onChange={handleUploadFile} style={{display: 'none'}} type="file" accept='.zip'/>
            </button>}
            {isUpload !== undefined && <div className={styles.main__results}>
              {!isUpload ? <button className={styles.main__search}>
                <span className={styles.main__searchSpan}>Перейти к редактированию или скачиванию</span></button> : <Spinner />}
            </div>}
          </div>
        </main>
      </div>
    </>
  );
}
