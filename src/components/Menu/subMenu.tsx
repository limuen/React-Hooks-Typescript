import React, { FunctionComponentElement, useContext } from 'react';
import classNames from 'classnames';
import { MenuContest } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: number;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className  }) => {
    const context = useContext(MenuContest);
    const classes = classNames('limuen-menu-item limuen-submenu-item', className, {
        'is-active': context.index === index
    })
    const renderChildren = () => {
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return childElement;
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <ul className="limuen-submenu">
                {childrenComponent}
            </ul>
        )
    }
    return (
        <li key={index} className={classes}>
            <div className="limuen-submenu-title">
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu