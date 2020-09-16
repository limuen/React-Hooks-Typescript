import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'

type onSelectCallback = (selectIndex: number) => void;

export interface MenuProps {
    /**默认 active 的菜单项的索引值 */
    defaultIndex?: number;
    className?: string;
    /**菜单类型 横向或者纵向 */
    mode?: MenuMode;
    style?: React.CSSProperties;
    /**点击菜单项触发的回掉函数 */
    onSelect?: onSelectCallback
}

interface IMenuContext {
    index: number;
    onSelect?: onSelectCallback;
    mode?: MenuMode;
}

export const MenuContest = createContext<IMenuContext>({ index: 0 })

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, children, onSelect } = props;
    const [currentActive, setActive] = useState(defaultIndex)
    const classes = classNames('limuen-menu', className, {
        'limuen-menu-vertical': mode === 'vertical',
        'limuen-menu-horizontal': mode !== 'vertical'
    })

    const handleClick = (index: number) => {
        setActive(index);
        if (onSelect) {
            onSelect(index)
        }
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handleClick,
        mode: mode,
    }

    const renderChildred = () => {
        return React.Children.map(children, (child, index)=> {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName }  = childElement.type
            if(displayName === 'MenuItem' || displayName === 'SubMenu'){
                return React.cloneElement(childElement, {
                    index
                })
            }else {
                console.error('Warning: Menu has a child which is not a MenuItem component')
            }
        })
    }

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContest.Provider value={passedContext}>
                {renderChildred()}
            </MenuContest.Provider>
        </ul>
    )
}

Menu.defaultProps = {
    defaultIndex: 0,
    mode: 'horizontal'
}

export default Menu