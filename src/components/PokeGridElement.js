import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import PokeBasicInfo from './PokeBasicInfo';
import { getPrimaryTypeColor } from '../helpers/colorHelper';
import Pokeball from '../resources/img/pokeball.svg';
import { ReactComponent as Dots1 } from '../resources/img/dots.svg';

const PokeGridElement = ({ pkm }) => {
  return (
    <li style={{ backgroundColor: getPrimaryTypeColor(pkm) }}>
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
