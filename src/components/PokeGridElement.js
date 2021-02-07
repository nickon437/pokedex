import React, { useContext } from 'react';
import PokeBasicInfo from './PokeBasicInfo';
import { PokedexContext, ACTION } from '../context/PokedexContext';
import Pokeball from '../resources/img/pokeball.svg';
import ColorUtil from '../utils/ColorUtil';
import { withRouter } from 'react-router-dom';
import { ReactComponent as Dots1 } from '../resources/img/dots.svg';

const PokeGridElement = ({ pkm, history }) => { // TODO: Check to avoid pushing with history
  const [ctxPokedex, dispatch] = useContext(PokedexContext);

  const handleClickItem = () => {
    dispatch({ type: ACTION.SHOW_DETAIL_VIEW, selectedPokemon: pkm });
    history.push(`/pokemon/${pkm.id}`);
  };

  return (
    <li onClick={handleClickItem} style={{backgroundColor: ColorUtil.getPrimaryTypeColor(pkm)}}>
      <div className="background-patterns" name="background-patterns">
        <img src={Pokeball} name="pokeball" alt=""/>
        <Dots1 />
      </div>
      <PokeBasicInfo pkm={pkm} />
    </li>
  )
}

export default withRouter(PokeGridElement);
