import React, { useState } from 'react';

export const PokedexContext = React.createContext();

export const PokedexProvider = (props) => {
  const [ctxPokedex, setCtxPokedex] = useState({
    pokemons: [],
    selectedGenPokemons: [],
    filteredPokemons: [],
    selectedPkm: null,
    searchKeyword: '',
    class: {
      loadingView: true,
      generationView: false,
      pokemonListView: false,
      splitView: false,
      reverseSplitView: false,
      splitViewHiddenProp: true,
    }
  });

  return (
    <PokedexContext.Provider value={[ctxPokedex, setCtxPokedex]}>
      {props.children}
    </PokedexContext.Provider>
  );
}