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




const campogrande = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:'./arquivos/perimetro.json',
    format: new GeoJSON()
  })
});

const baciasDrenagem = new VectorLayer({
  // background: '#1a2b39',
  source: new VectorSource({
    url:'./arquivos/baciasDrenagem.json',
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
    url:'./arquivos/galDrenagem.json',
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
    url:'./arquivos/bocaLobo.json',
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
    url:'./arquivos/bigodes.json',
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
    url:'./arquivos/pocosVisita.json',
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
    url:'./arquivos/pontosLancamento.json',
    format: new GeoJSON()
  }),
  style: new Style({
    image: new Icon({
      src: './figuras/drop.jpg',
      scale: 0.02
      })
    })
  });




const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: fromLonLat([-54.6467, -20.4697]),
    zoom: 12,
  })
});

map.addLayer(campogrande);
map.addLayer(baciasDrenagem);
map.addLayer(bocaLobo);
map.addLayer(pocosVisita);
map.addLayer(bigodes);
map.addLayer(galDrenagem);
map.addLayer(pontosLancamento);


