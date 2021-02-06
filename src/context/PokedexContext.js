import React, { useReducer } from 'react';
import ColorUtil from '../utils/ColorUtil';

export const PokedexContext = React.createContext();

export const PokedexProvider = (props) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case ACTION.COMPLETE_FETCH_POKEMONS:
        return {
          ...state,
          pokemons: action.pokemons,
          class: {
            ...state.class,
            mainView: 'generation-view',
          }
        };
      case ACTION.SET_SELECTED_GEN_POKEMON:
        return {
          ...state,
          selectedGenPokemons: action.selectedGenPokemons,
          filteredPokemons: action.selectedGenPokemons,
          class: {
            ...state.class,
            mainView: 'pokemon-list-view',
          }
        };
      case ACTION.BACK_TO_GENERATION_VIEW:
        return {
          ...state,
          class: {
            ...state.class,
            mainView: 'generation-view',
          }
        }
      case ACTION.SHOW_DETAIL_VIEW:
        document.getElementById('root').scroll({
          top: 0,
          behavior: 'smooth',
        });
        document.querySelector('main').style.backgroundColor = ColorUtil.getPrimaryTypeColor(action.selectedPokemon);
        return {
          ...state,
          selectedPokemon: action.selectedPokemon,
          class: {
            ...state.class,
            splitView: true,
          }
        };
      case ACTION.TRANSITION_CLOSE_DETAIL_VIEW:
        return {
          ...state,
          class: {
            ...state.class,
            reverseSplitView: true,
          }
        };
      case ACTION.COMPLETE_TRANSITION_CLOSE_DETAIL_VIEW:
        return {
          ...state,
          class: {
            ...state.class,
            splitView: false,
            reverseSplitView: false,
          }
        };
      case ACTION.SET_FILTERED_POKEMONS:
        return {
          ...state,
          filteredPokemons: action.filteredPokemons,
          searchKeyword: action.searchKeyword,
        };
      default:
        return state;
    }
  }

  const [ctxPokedex, dispatch] = useReducer(reducer, {
    pokemons: [],
    selectedGenPokemons: [],
    filteredPokemons: [],
    selectedPokemon: null,
    searchKeyword: '',
    class: {
      mainView: 'loading-view',
      splitView: false,
      reverseSplitView: false,
    }
  });

  return (
    <PokedexContext.Provider value={[ctxPokedex, dispatch]}>
      {props.children}
    </PokedexContext.Provider>
  );
}

export const ACTION = {
  COMPLETE_FETCH_POKEMONS: 'completeFetchPokemons',
  SET_FILTERED_POKEMONS: 'setFilteredPokemons',
  SET_SELECTED_GEN_POKEMON: 'setSelectedGenPokemon',
  BACK_TO_GENERATION_VIEW: 'backToGenerationView',
  SHOW_DETAIL_VIEW: 'showDetailView',
  TRANSITION_CLOSE_DETAIL_VIEW: 'transitionCloseDetailView',
  COMPLETE_TRANSITION_CLOSE_DETAIL_VIEW: 'completeTransitionCloseDetailView',
}