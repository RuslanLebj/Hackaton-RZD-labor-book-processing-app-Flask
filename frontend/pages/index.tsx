import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.scss";
import Image from 'next/image'
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [activeModel, setActiveModel] = useState('model1')

  const models = ['model1', 'model2', 'model3']

  const [isDisplayModels, setIsDisplayModels] = useState(false)

  const listRef = useRef<HTMLDivElement>(null)

  useOutsideClick(listRef, ()=>{setIsDisplayModels(false)})

  return (
    <>
      <Head>
        <title>Electronic</title>
        <meta name="description" content="Electronic" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.header__title}>ELECTRONIC</h1>
          <div ref={listRef} className={styles.header__modelSelectContainer}>
            <div onClick={()=>{setIsDisplayModels(!isDisplayModels)}} className={styles.header__modelSelect}>
              <span>{activeModel}</span>
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 6L13 1" stroke="red" />
              </svg>
            </div>
            {isDisplayModels && 
              <div className={styles.header__modelList}>
                {models.map((model)=>(<p onClick={()=>{setActiveModel(model); setIsDisplayModels(false)}} className={styles.header__modelListPoint} key={model}>{model}</p>))}
              </div>
            }
          </div>  
          <Image src="/icons/railways.png" width={95} height={55} alt=""/>
        </header>
        <main className={styles.main}>
          <div className={styles.main__welcome}>
              <h1 className={styles.main__title}>Приятно видеть вас снова</h1>
              <button className={styles.main__search}>
                <Image src="/icons/stars.svg" width={26} height={26} alt=""/>
                <span className={styles.main__searchSpan}>Проанализировать запись</span>
              </button>
          </div>
          <div className={styles.main__results}>
            <h2 className={styles.results__title}>Скачайте результат</h2>
            <div className={styles.results__links}>
              <a href='' className={styles.results__result}>
                  <Image src="/icons/excel.svg" width={26} height={26} alt=""/>
                  <span className={styles.main__searchSpan}>Excel</span>
              </a>
              <a href='' className={styles.results__result}>
                  <Image src="/icons/csv.png" width={26} height={26} alt=""/>
                  <span className={styles.main__searchSpan}>CSV</span>
              </a>
              <a href='' className={styles.results__result}>
                  <Image src="/icons/json.png" width={26} height={26} alt=""/>
                  <span className={styles.main__searchSpan}>JSON</span>
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
