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

import * as autodesk from './Autodesk/autodesk';
import * as moldflow from './Moldflow/moldflow';
import * as sts from './STS/sts';
import * as gec from './GEC/gec';


// console.log(JSON.stringify(moldflow));

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

const key = function(data) {
  if (!data)
    return ""
  return cyrb53(JSON.stringify(data))
}

const block = function(data) {
  if (!data)
    return [];
  return [ data.join(' ') ];
}

const value = function(data) {
  if (!data)
    return "";
  return data.toString();
}

const list = function(data) {
  if (!data)
    return [];
  return [ data.join(', ') ];
}

const link = function(data) {
  return (data.url ? <UrlButton href={data.url} target='_blank'>More information...</UrlButton> : <span/>);
}

const image = function(data) {
  return (data.image ? 
    <img 
      src={window.location.href + "/" + data.image} 
      alt={data.image}
      style={{maxWidth: '100%'}}
    />
    : <span />)
}

const details = function(data) {
  if (data.atoms.length === 0) {
    return (<TextAtom text={data.tagline} key={key(data)}></TextAtom>)
  }
  return (<Collapsible  trigger={value(data.tagline)}>    
            <p style={{margin: '.5em'}}></p>                          
            {data.atoms.map((item) => {
              return <TextAtom text={item} key={key(item)}></TextAtom>
            })}
            {image(data)}
            {link(data)}
    </Collapsible>)
}

const event = function(data) {
  if (data.image) {
    return (<ImageEvent 
              date={value(data.date)}
              text={value(data.title)}
              src={value(data.image)}
              alt={value(data.title)}
              key={key(data)}
            >
              {details({ 
                tagline : data.tagline,
                atoms : block(data.details),
                url : data.url
              })}
            </ImageEvent>)
  }
  else {
    return (<TextEvent 
              date={value(data.date)} 
              text={value(data.title)} 
              key={key(data)}
            >
              {details({ 
                  tagline : data.tagline,
                  atoms : block(data.details),
                  url : data.url
                })}
            </TextEvent>)
  }
}

const company = function(data) {
  console.log(JSON.stringify(data))
  return event({
    date : data.date,
    title : data.name,
    image : data.logo,
    details : data.details,
    tagline: data.tagline,
    url : data.url
  })
}

const atoms = function(data) {
  var atoms = [];
  if (!data.job) {
    if (data.role) atoms.push("Role: " + value(data.role));
    if (data.team) atoms.push("Team size: " + value(data.team));
    if (data.details) atoms.push("Details: " + block(data.details));
    if (data.skills) atoms.push("Skills: " + list(data.skills));
  }
  return atoms;
}

const ptype = function(data) {
  return (!data.job ? "Project: " : "Job: ");
}

const projects = function(data) {
  return data.slice(0).reverse().map((item)=> {
        return <TextEvent date={value(item.date)} text={ptype(item) + value(item.name)} key={key(item)}>
                <p style={{margin: '.5em'}}></p>     
                {details({
                  tagline : item.tagline,
                  atoms : atoms(item),
                  url : item.url,
                  image : item.image
                })}
              </TextEvent>  
  })
}


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
        
        {company(autodesk.company)}
        {projects(autodesk.projects)}
        
        {company(moldflow.company)}
        {projects(moldflow.projects)}
        
        {company(sts.company)}
        {projects(sts.projects)}

        {company(gec.company)} 
        {projects(gec.projects)}
        
      </Events>
    </Timeline>
    </div>
  );
}

export default App;
