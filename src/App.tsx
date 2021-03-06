import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
// import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';
import Icon from './components/Icon/icon';

library.add(fas)
const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
      <Icon icon="arrow-down" theme="primary" size="10x" />
        <Menu defaultIndex='0' onSelect={(index) => { alert(index) }} mode="horizontal" defaultOpenSubMenus={['2']}>
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
            <MenuItem>dropdown3</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        {/* <p>
          Edit <code>src/App.tsx</code> limuen
        </p> */}
      </header>
    </div>
  );
}

export default App;
