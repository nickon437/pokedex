import React from 'react';

const Stat = ({ pkm }) => {
  if (!pkm) {
    return <></>;
  }

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

  let totalStat = 0;
  const statHtml = pkm.stats.map((curStat) => {
    const baseStat = curStat.base_stat;
    totalStat += baseStat;
    return (
      <>
        <div className="label">{codifyStatName(curStat.stat.name)}</div>
        <div className="figure">{baseStat}</div>
        <div className="progress-bar">
          <div style={{'width': `${(baseStat / 255) * 100}%`}}></div>
        </div>
      </>
    )
  });

  return (
    <>
      <h2>Stats</h2>
      <div className="progress-bar-container">
        {statHtml}
        <div className="label">TOTAL</div>
        <div className="figure">{totalStat}</div>
      </div>
    </>
  )
}

export default Stat