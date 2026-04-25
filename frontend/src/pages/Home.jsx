import React from 'react'
import Header from '../components/pages/Header'
import Hero from '../components/pages/Hero'
import ConceptSection from './ConceptSection'
import ActivitySection from './ActivitySection'
import PlanningSection from './PlanningSection'
import ContactSection from './ContactSection'
import BoutiqueSection from './BoutiqueSection'
import GallerySection from './GallerySection'
import Footer from '../components/pages/Footer'

const Home = () => {
  return (
    <>
    <Header />
    <Hero />
    <ConceptSection />
    <ActivitySection />
    <PlanningSection />
    <ContactSection />
    <BoutiqueSection />
    <GallerySection />
    <Footer />
    </>
  )
}

export default Home