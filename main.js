import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import View from 'ol/View.js';
import {fromLonLat} from 'ol/proj.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {Style, Fill, Stroke, Circle, Image, Icon} from 'ol/style';
import CircleStyle from 'ol/style/Circle.js';
import Overlay from 'ol/Overlay';
import Select from 'ol/interaction/Select.js';

const arquivosPath = './';


//VECTOR LAYERS
const campogrande = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/perimetro.json`,
    format: new GeoJSON()
  })
});

const baciasDrenagem = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/baciasDrenagem.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'red'
    })
  })
});

const galDrenagem = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/galDrenagem.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    })
  })
});

const bocaLobo = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/bocaLobo.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    image: new Circle({
      radius: 4,
      fill: new Fill({
        color: 'blue'
      })
    })
  })
});

const bigodes = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/bigodes.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    stroke: new Stroke({
      color: 'green',
      width: 3
    })
  })
});



const pocosVisita = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/pocosVisita.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    image: new Circle({
      radius: 6,
      fill: new Fill({
        color: 'purple'
      })
    })
  })
});

const pontosLancamento = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:`${arquivosPath}arquivos/pontosLancamento.json`,
    format: new GeoJSON()
  }),
  style: new Style({
    image: new Icon({
      src: './figuras/drop.jpg',
      scale: 0.02
      })
    })
  });



  const jazigosSaoSebastiao = new VectorLayer({
    // background: '#1a2b39',
    source: new VectorSource({
      url:`${arquivosPath}arquivos/jazigosSaoSebastiao.json`,
      format: new GeoJSON()
    })
  });


//-------POPUP JAZIGOS--------
const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');






//MAP
const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    // center: fromLonLat([-54.58425, -20.4256]),
    center: fromLonLat([-54.616667, -20.442778]),
    zoom: 11,
  })
});


//ADD LAYERS
map.addLayer(campogrande);
map.addLayer(baciasDrenagem);
map.addLayer(bocaLobo);
map.addLayer(pocosVisita);
map.addLayer(bigodes);
map.addLayer(galDrenagem);
map.addLayer(pontosLancamento);
map.addLayer(jazigosSaoSebastiao);

// jazigosSaoSebastiao.on('singleclick', function(e){
//   const nome = e.type;
//   console.log(nome)
  
// });

const featureOverlay = new VectorLayer({
  source: new VectorSource(),
  map: map,
  style: {
    // 'stroke-color': 'rgba(255, 255, 255, 0.7)',
    'stroke-color': 'red',
    'stroke-width': 2,
  },
});

let highlight;
const displayFeatureInfo = function(pixel){
  const feature = map.forEachFeatureAtPixel(pixel, function(feature){
    console.log(feature.getProperties());
    return feature;
  })

  // <div id="info" class="jazigo">
  //     <h2 id="jazigo">Dados do jazigo</h2>
  //     <p id="nome"><strong>Nome</strong></p>
  //     <p id="sobrenome"><strong>Sobrenome</strong></p>
  //     <p id="idade"><strong>Idade do falecido:</strong></p>
  //     <p id="impermeabilizado"><strong>Impermeabilizado</strong></p>
  //   </div>
 
  if(feature){
    let elNome = document.getElementById('nome');
    let textNome = document.createTextNode(feature.get('nome'));
    elNome.innerHTML = "Nome: ";
    elNome.appendChild(textNome);

    let elSobrenome = document.getElementById('sobrenome');
    let textSobrenome = document.createTextNode(feature.get('sobrenome'));
    elSobrenome.innerHTML = "Sobrenome: ";
    elSobrenome.appendChild(textSobrenome);

    let elIdade = document.getElementById('idade');
    let textIdade = document.createTextNode(feature.get('idade'));
    elIdade.innerHTML = "Idade: ";
    elIdade.appendChild(textIdade);
    
    let elImpermeabilizado = document.getElementById('impermeabilizado');
    let textImpermeabilizado;
    if(feature.get('impermeabilizado') == 0){
      textImpermeabilizado = document.createTextNode('Não');
    } else if(feature.get('impermeabilizado') == 1){
      textImpermeabilizado = document.createTextNode('Sim');
    }
    elImpermeabilizado.innerHTML = "Impermeabilizado: ";
    elImpermeabilizado.appendChild(textImpermeabilizado);

  } else {
    elNome.innerHTML = "Nome: ";
  }

  if (feature !== highlight) {
    if (highlight) {
      featureOverlay.getSource().removeFeature(highlight);
    }
    if (feature) {
      featureOverlay.getSource().addFeature(feature);
    }
    highlight = feature;
  }
};
  
map.on('click', function(e){
  if(e.dragging){
    return;
  }
  const pixel = map.getEventPixel(e.originalEvent);
  displayFeatureInfo(pixel);
});

