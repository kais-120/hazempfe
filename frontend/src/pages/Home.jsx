import React, { useEffect, useState } from 'react'
import Header from '../components/pages/Header'
import Hero from '../components/pages/Hero'
import ConceptSection from './ConceptSection'
import ActivitySection from './ActivitySection'
import PlanningSection from './PlanningSection'
import ContactSection from './ContactSection'
import BoutiqueSection from './BoutiqueSection'
import GallerySection from './GallerySection'
import Footer from '../components/pages/Footer'
import { Axios } from '../Api/Api'

const Home = () => {
  const [store,setStore] = useState([]);
  useEffect(()=>{
    const storeData = async () => {
      try{
        const res = await Axios.get("/product/public");
        setStore(res.data.products)
      }catch{
        console.error("error")
      }
    }
    storeData()
  },[])
  return (
    <>
    <Header />
    <Hero />
    <ConceptSection />
    <ActivitySection />
    <PlanningSection />
    <ContactSection />
    {store && store.length > 0 &&
    <BoutiqueSection store={store} />
    }
    <GallerySection />
    <Footer />
    </>
  )
}

export default Home