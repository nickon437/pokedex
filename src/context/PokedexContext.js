import React, { useReducer } from 'react';

export const PokedexContext = React.createContext();

export const PokedexProvider = (props) => {
  const reducer = (state, action) => {
    const refreshedState = {
      ...state,
      isLoadingPage: false,
      error: null,
    };

    switch (action.type) {
      case ACTION.FETCH_ALL_POKEMONS_REQUEST:
        return {
          ...refreshedState,
          isLoadingPage: true,
        };

      case ACTION.FETCH_ALL_POKEMONS_SUCCEED:
        return {
          ...refreshedState,
          pokemons: action.payload,
        };

      case ACTION.FETCH_ALL_POKEMONS_FAIL:
        return {
          ...refreshedState,
          error: action.payload,
        };

      case ACTION.SET_SELECTED_GEN_POKEMON:
        return {
          ...refreshedState,
          selectedGenPokemons: action.payload,
          filteredPokemons: action.payload,
        };

      case ACTION.SET_FILTERED_POKEMONS:
        return {
          ...refreshedState,
          filteredPokemons: action.payload.filteredPokemons,
          searchKeyword: action.payload.searchKeyword,
        };

      default:
        return state;
    }
  };

  const [ctxPokedex, dispatch] = useReducer(reducer, {
    isLoadingPage: true,
    pokemons: [],
    selectedGenPokemons: [],
    filteredPokemons: [],
    selectedPokemon: null,
    searchKeyword: '',
    error: null,
  });

  return (
    <PokedexContext.Provider value={[ctxPokedex, dispatch]}>
      {props.children}
    </PokedexContext.Provider>
  );
};

export const ACTION = {
  FETCH_ALL_POKEMONS_REQUEST: 'FETCH_ALL_POKEMONS_REQUEST',
  FETCH_ALL_POKEMONS_SUCCEED: 'FETCH_ALL_POKEMONS_SUCCEED',
  FETCH_ALL_POKEMONS_FAIL: 'FETCH_ALL_POKEMONS_FAIL',
  SET_FILTERED_POKEMONS: 'setFilteredPokemons',
  SET_SELECTED_GEN_POKEMON: 'setSelectedGenPokemon',
};
