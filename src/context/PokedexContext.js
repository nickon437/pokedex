import React, { useState } from 'react';

export const PokedexContext = React.createContext();

export const PokedexProvider = (props) => {
  const [ctxPokedex, setCtxPokedex] = useState({
    pokemons: [],
    selectedPkm: null,
    class: {
      splitView: false,
      reverseSplitView: false,
    }
  });

  return (
    <PokedexContext.Provider value={[ctxPokedex, setCtxPokedex]}>
      {props.children}
    </PokedexContext.Provider>
  );
}