import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button size={ButtonSize.Small} className="custom" onClick={(e)=>{e.preventDefault(); alert('123123')}}> Hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hellow </Button>
        <Button btnType={ButtonType.Default} size={ButtonSize.Large}> hellow </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> hellow </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_black"> baidu Link </Button>
        <p>
          Edit <code>src/App.tsx</code> limuen
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
