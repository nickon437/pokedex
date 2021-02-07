import React from 'react';
import PokeBasicInfo from './PokeBasicInfo';
import Pokeball from '../resources/img/pokeball.svg';
import ColorUtil from '../utils/ColorUtil';
import { withRouter, Link } from 'react-router-dom';
import { ReactComponent as Dots1 } from '../resources/img/dots.svg';

const PokeGridElement = ({ pkm }) => {
  return (
    <li style={{ backgroundColor: ColorUtil.getPrimaryTypeColor(pkm) }}>
      <Link to={`/pokemon/${pkm.id}`} className='unstyled'>
        <div className='background-patterns' name='background-patterns'>
          <img src={Pokeball} name='pokeball' alt='' />
          <Dots1 />
        </div>
        <PokeBasicInfo pkm={pkm} />
      </Link>
    </li>
  );
};

export default withRouter(PokeGridElement);
