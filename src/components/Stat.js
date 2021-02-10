import React, { useEffect, useRef } from 'react';

const Stat = ({ pkm }) => {
  const statJsx = useRef();
  const totalStat = useRef(0);

  const codifyStatName = (name) => {
    switch (name) {
      case 'hp':
        return 'HP';
      case 'attack':
        return 'ATK';
      case 'defense':
        return 'DEF';
      case 'special-attack':
        return 'SPA';
      case 'special-defense':
        return 'SPD';
      case 'speed':
        return 'SPE';
      default:
        return 'UNKNOWN';
    }
  };

  useEffect(() => {
    totalStat.current = 0;
    statJsx.current = pkm.stats.map((curStat) => {
      const baseStat = curStat.base_stat;
      totalStat.current += baseStat;
      return (
        <div className="stat-container" key={codifyStatName(curStat.stat.name)}>
          <div className="label">{codifyStatName(curStat.stat.name)}</div>
          <div className="figure">{baseStat}</div>
          <div className="progress-bar">
            <div style={{width: `${(baseStat / 255) * 100}%`}}></div>
          </div>
        </div>
      )
    });
  }, [pkm])

  return (
    <section id="stat-section">
      <h2>Stats</h2>
      <div className="stat-section-content">
        {statJsx.current}
        <div className="stat-container">
          <div className="label">TOTAL</div>
          <div className="figure">{totalStat.current}</div>
        </div>
      </div>
    </section>
  )
}

export default Stat;
