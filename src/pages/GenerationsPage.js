import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PokedexContext } from '../context/PokedexContext';
import Pokeball from '../resources/img/pokeball.svg';
import { convertToRoman } from '../helpers/stringHelper';
import { gens, getFrontSprite } from '../helpers/pokemonHelper';
import { ReactComponent as Dots1 } from '../resources/img/dots.svg';
import '../styles/GenerationsPage.scss';

const GenerationsPage = () => {
  const [ctxPokedex, dispatch] = useContext(PokedexContext);
  const [generationListJsx, setGenerationListJsx] = useState();
  const { pokemons } = ctxPokedex;

  useEffect(() => {
    setGenerationListJsx(
      gens.map((num, genIndex) => {
        const startPkmIndex = genIndex === 0 ? 0 : gens[genIndex - 1];
        const startPkmId = startPkmIndex + 1;

        // Stop generating generationListJsx for undefined pokemons
        if (startPkmId + 6 > pokemons.length) {
          return null;
        }

        return (
          <Link
            to={`/gen/${genIndex}`}
            className='generation-box'
            key={genIndex}
          >
            <div className='background-patterns' aria-hidden='true'>
              <img src={Pokeball} alt='' name='pokeball' />
              <Dots1 />
            </div>
            <img
              className='starter'
              src={getFrontSprite(pokemons[startPkmId - 1])}
              alt=''
            />
            <img
              className='starter'
              src={getFrontSprite(pokemons[startPkmId + 2])}
              alt=''
            />
            <img
              className='starter'
              src={getFrontSprite(pokemons[startPkmId + 5])}
              alt=''
            />
            <div className='generation-heading'>
              GENERATION {convertToRoman(genIndex + 1)}
            </div>
          </Link>
        );
      })
    );
  }, [pokemons]);

  return <div id='generations-section'>{generationListJsx}</div>;
};

export default GenerationsPage;
