import React from 'react';
import './App.css';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";

import { CircularProgress } from '@material-ui/core';

const GET_POKEMON_INFO = gql`
{
    pokemons(first: 250) {
      id
      number
      name,
      image,
      evolutions {
        id,
        number,
        name,
        image
      }
    }
  }`


const App = () => {

  const { data, loading, error } = useQuery(GET_POKEMON_INFO);

  if (loading) return <div className="App"> <CircularProgress color="primary" /></div>


  if (error) return <div className="App"><p>Error</p></div>


  return (
    <React.Fragment>
      <div className="App">
        <header className="App_header">
          <h1>Pokémons</h1>

          <p>
            <a href="https://en.wikipedia.org/wiki/List_of_Pok%C3%A9mon">
              The Pokémon franchise
        </a>{" "} <br />
        revolves around 832 fictional species of collectible monsters, each having
        unique designs and skills. Conceived by Satoshi Tajiri in early 1989,
        Pokémon are creatures that inhabit the fictional Pokémon World. This is
        the list of the first 150 Pokémon as they appear in Pokémon Stadium,
        starting with Bulbasaur in the top left corner and ending with Mewtwo in
        the bottom right corner.
      </p>
          <div className="container">
            {data &&
              data.pokemons &&
              data.pokemons.map((pokemon, index) => (
                <div key={index} className="card">
                  <img src={pokemon.image} alt="" />
                  <div className="card-body">
                    <h3>{pokemon.name}</h3>
                    <div>
                      {pokemon.evolutions && pokemon.evolutions.length !== 0 && (
                        <>
                          <div>
                            {" "}
                      Evolutions:
                          {pokemon.evolutions.map((e, indx) => {
                              return <p key={indx}> {e.name} </p>;
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
// Query Ask from Data
// mutation Modifed Data



//GraphQl =>  url/"Graphql" => All Api Data To your App