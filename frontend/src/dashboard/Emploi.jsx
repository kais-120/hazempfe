import React from 'react'
import { useProfile } from '../utils/context/useProfile'
import EmploiJoueur from './joueur/EmploiJoueur';
import EmploiEntraineur from './entraineur/EmploiEntraineur';
import EmploiParent from './parent/EmploiParent';

const Emploi = () => {
    const {loading,user} = useProfile();
  if(loading) return 'loading...'
  if(user) return user.role === "joueur" ?
  <EmploiJoueur /> 
  : user.role === "parent" ?
  <EmploiParent />
  :<EmploiEntraineur />
}

export default Emploi