import React, { FunctionComponentElement, useState, useContext } from 'react';
import classNames from 'classnames';
import { MenuContest } from './menu';
import { MenuItemProps } from './menuItem';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, children, className }) => {

    const context = useContext(MenuContest);
    const openSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpen = (index && context.mode === 'vertical') ? openSubMenus.includes(index) : false;
    const [MenuOpen, setOpen] = useState(isOpen);
    const classes = classNames('limuen-menu-item limuen-submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': MenuOpen,
        'is-vertical': context.mode === 'vertical'
    })
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!MenuOpen)
    }
    let timer: any;
    const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
    } : {}
    const renderChildren = () => {
        const subMenuClasses = classNames('limuen-submenu', {
            'menu-opened': MenuOpen
        })
        const childrenComponent = React.Children.map(children, (child, index) => {
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${index}`
                })
            } else {
                console.error('Warning: SubMenu has a child which is not a MenuItem component')
            }
        })
        return (
            <Transition
                in={MenuOpen}
                timeout={300}
                animation="zoom-in-top"
            >
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }
    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className="limuen-submenu-title" {...clickEvents}>
                {title}
                <Icon icon="angle-down" className="arrow-icon" />
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu