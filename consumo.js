var config = {
  method: 'get',
  url: 'https://pokeapi.co/api/v2/pokemon-form/?limit=151',
  headers: {},
};

// var config = {
//   method: 'get',
//   url: 'https://pokeapi.co/api/v2/pokemon/151/',
//   headers: {},
// };


function consumo() {
  axios(config)
    .then(function (response) {
      var idPoke = JSON.stringify(response.data)
      let almacenar = '';
      for (let i = 0; i < 151; i++) {
        var json = JSON.stringify(response.data.results[i].name);
        var name = json.slice(1, -1)


        // BOTON POKEMON
        almacenar += '<div class="carta">' +
          '<button type="button" class="btn btn-primary" onclick="consumoAbility(' + (i + 1) + ')" data-toggle="modal" data-target="#abrirModal' + (i + 1) + '"> ' +
          '<img class="imgPokemon" src="assets/image/' + (i + 1) + '.png" >' +
          '<div class="card-body">' +
          '<h5 class="nombre-Pokemon">' + (name[0].toUpperCase() + name.substring(1)) + '</h5>' +
          '</div>' +
          '</button>' +
          '</div>' +

          // MODAL
          '<div class="modal fade " id="abrirModal' + (i + 1) + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> ' +
          '<div class="modal-dialog modal-lg" role="document">' +
          '<div class="modal-content">' +
          '<div class="modal-header">' +

          // Nombre header Pokemon
          '<h5 class="modal-title d-flex justify-content-center" id="exampleModalLabel">' + (name[0].toUpperCase() + name.substring(1)) + '</h5>' +

          // Boton header close
          '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
          '<span aria-hidden="true">&times;</span>' +
          '</button>' +
          '</div>' +

          // Cuerpo modal (img, stats, #pokemon)
          '<div class="modal-body row modalContendedor">' +
          '<div class="col-4 modalContendedor"> <img class="imgPokemonModal d-flex justify-content-center" src="assets/image/' + (i + 1) + '.png" > </div>' +
          '<div class="col-8 row modalContendedor"> <div class="col-5" id="tipo1">hola</div> <div class="col-5" id="tipo2" >hola</div> ' +

          // TIPO POKEMON
          '<div class="col-10 statsPokemon modalContendedor" id="statsPok' + (i + 1) + '">' +
          '</div>' +


          '<div class="col-2 numberPoke modalContendedor">#' + (i + 1) + ' ' +
          '</div>' +
          '</div>' +
          '</div>' +

          // Descripción pokemon
          '<div class="descripcionPoketittle">descri</div>' +
          '<div class="descripcionPoketittle">descripción</div>' +
          '<div class="modal-footer">' +
          '<button type="button" class="btn btn-secondary" data-dismiss="modal">Ábrase alv</button>' +
          '</div>' +
          '</div>' +
          '</div>' +
          '</div>';
      }
      const buscador = document.getElementById('cartas-block');

      buscador.innerHTML = almacenar;
    })


    .catch(function (error) {
      console.error(error);
    });

}

function consumoAbility(ID) {
  var statsPoke = ''

  axios({
    method: 'get',
    url: 'https://pokeapi.co/api/v2/pokemon/' + ID + '/',
    headers: {}
  })
    .then(function (response) {
      HP = JSON.stringify(response.data.stats[0].base_stat)
      ATTCK = JSON.stringify(response.data.stats[1].base_stat)
      DEF = JSON.stringify(response.data.stats[2].base_stat)
      ESPATTCK = JSON.stringify(response.data.stats[3].base_stat)
      ESPDEF = JSON.stringify(response.data.stats[4].base_stat)
      SPEED = JSON.stringify(response.data.stats[5].base_stat)

      console.log(HP, ATTCK, DEF, ESPATTCK, ESPDEF, SPEED)

      let almacenarStats = ''
      almacenarStats = almacenarStats +
        'HP ' + HP + '<br>' +
        'Attack ' + ATTCK + '<br>' +
        'Defense ' + DEF + '<br>' +
        'Esp. Attack ' + ESPATTCK + '<br>' +
        'Esp. Defense ' + ESPDEF + '<br>' +
        'Speed ' + SPEED

      const viewStats = document.getElementById('statsPok' + ID)
      viewStats.innerHTML = almacenarStats

      // TIPO POKEMON
      tipo1 = JSON.stringify(response.data.types[0].type.name)
      tipo2 = JSON.stringify(response.data.types[1].type.name)
      console.log(tipo1,tipo2)

      let TYPE1 = tipo1.slice(1, -1)
      let TYPE2 = tipo2.slice(1, -1)
      
      let btntipo1 = ''
      btntipo1 = btntipo1 +
        '<button class="btn btn-light btn-modal-type">' + TYPE1.toUpperCase() +'</button>';

      const viewBtnType = document.getElementById('tipo1' + ID)
      viewBtnType.innerHTML = btntipo1
      
      let btntipo2 = ''
      btntipo2 = btntipo2 +
        '<button class="btn btn-light btn-modal-type">' + TYPE2.toUpperCase() +'</button>';

      const viewBtnType2 = document.getElementById('tipo2' + ID)
      viewBtnType2.innerHTML = btntipo2

      // PESO
      // PESO = JSON.stringify(response.data.weight)
      // console.log(peso)

    })

    .catch(function (error) {
      console.error(error);
    });
}

