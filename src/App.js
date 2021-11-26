import logo from './logo.svg';
import './App.css';


import {
  Timeline,
  Events,
  UrlButton,
  ImageEvent,
  TextEvent,
  YouTubeEvent,
} from '@merc/react-timeline';

import * as moldflow from './Moldflow/projects';

console.log(JSON.stringify(moldflow));

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
          credit="Software Engineer"
        />
          <ImageEvent
          date="1993"
          text="Special Telephone Systems"
          src=""
          alt=""
          credit="Software Engineer"
        />
        <ImageEvent
          date="1995"
          text="Moldflow"
          src="https://cdn.worldvectorlogo.com/logos/moldflow.svg"
          alt="Moldflow"
          credit="Director Software Engineering"
        />

        {moldflow.map((project)=> {
          return <TextEvent date={project.year.toString()} text={project.name}/>  
        })}

        <ImageEvent
          date="2008"
          text="Autodesk"
          src="https://brand.autodesk.com/app/uploads/2021/04/alternate-logo-1.svg"
          alt="Autodesk"
          credit="Senior Software Architects"
        />

      </Events>
    </Timeline>
    </div>
  );
}

export default App;
