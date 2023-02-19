import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination'
import axios from 'axios'
import './App.css';

function App() {
  const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon')
  const [nextpageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    setLoading(true);
    let cancel;
    axios.get(currentUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
    })

    return () =>{
      cancel()
    }
  },[currentUrl])

  function gotoNextPage() {
    setCurrentUrl(nextpageUrl);
  }

  function gotoPrevPage() {
    setCurrentUrl(prevPageUrl);
  }
  

  if(loading) return 'Loading....'

 
  return (
    <>
    <PokemonList pokemon={pokemon} />
    <Pagination
    gotoNextPage = {nextpageUrl ? gotoNextPage : null}
    gotoPrevPage = {prevPageUrl ? gotoPrevPage : null}
     />
     </>
  );
}

export default App;
