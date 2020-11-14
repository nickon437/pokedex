const DetailView = () => {
  console.log('detail');
  const BASE_URL = `https://pokeapi.co/api/v2/pokemon/${1}`;
  fetch(BASE_URL)
    .then((result) => result.json())
    .then((data) => {
      let zeros = '';
      for (let i = 0; i < 3 - data.id.toString().length; i++) {
        zeros += '0';
      }
      const pokeId = `#${zeros}${data.id}`;

      let types = '';
      for (let i = 0; i < data.types.length; i++) {
        types += `<div>${data.types[i].type.name.toUpperCase()}</div>`;
      }
      const detailHtml = `
        <div id="overview">
          <img src="${data.sprites.other['official-artwork'].front_default}"></img>
          <div name="basic-data">
            <div name="pokeId">${pokeId}</div>
              <div name="pokeName">${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</div>
              <div name="pokeTypes" class="hflex">
                ${types}
              </div>
            </div>
          </div>
        </div>
      `;
      $('#detail-view').html(detailHtml);
    });
};

DetailView();
