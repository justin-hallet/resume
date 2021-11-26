import logo from './logo.svg';
import './App.css';


import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
  TextAtom,
} from '@merc/react-timeline';

import Collapsible from 'react-collapsible';

import * as moldflow from './Moldflow/projects';

console.log(JSON.stringify(moldflow));

const cyrb53 = function(str, seed = 0) {
  let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
  h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1>>>0);
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Justin Hallet
        </p>
      </header>
      <Timeline>
      <Events>
      <ImageEvent
          date="1990"
          text="GEC Marconi Avionics"
          src="https://cdn.rochesteravionicarchives.co.uk/img/catalog/GEC-Marconi_Avionics.jpg"
          alt="GEC Marconi Avionics"
        />
          <ImageEvent
          date="1993"
          text="Special Telephone Systems"
          src=""
          alt=""
        />
        <ImageEvent
          date="1995"
          text="Moldflow"
          src="https://cdn.worldvectorlogo.com/logos/moldflow.svg"
          alt="Moldflow"
        />

        {moldflow.map((project)=> {
          const atoms = [
            "Role: " + project.role,
            "Team size: " + project.team,
            "Details: " + project.details,
            "Skills: " + project.skils,
          ]
          return <TextEvent date={project.year.toString()} text={project.name} key={cyrb53(project.name)}>
                    <p style={{margin: '.3em'}}></p>
                    <Collapsible trigger={project.tagline}>            
                      <p style={{margin: '.3em'}}></p>                          
                      {atoms.map((text) => {
                        return <TextAtom text={text} key={cyrb53(text)}></TextAtom>
                      })}
                    </Collapsible>
                 </TextEvent>  
        })}

        <ImageEvent
          date="2008"
          text="Autodesk"
          src="https://brand.autodesk.com/app/uploads/2021/04/alternate-logo-1.svg"
          alt="Autodesk"
        />

      </Events>
    </Timeline>
    </div>
  );
}

export default App;
