import React from 'react';
import { fireEvent, render, RenderResult, cleanup, wait } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';
import SubMenu from './subMenu';
const testProps: MenuProps = {
    defaultIndex: '0',
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: '0',
    mode: "vertical",
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem >active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem >xyz</MenuItem>
            <SubMenu title="dropdown">
                <MenuItem>
                    drop1
                </MenuItem>
            </SubMenu>
            <SubMenu title="opened">
                <MenuItem>
                    opened1
                </MenuItem>
            </SubMenu>
        </Menu>
    )

}
const createStyleFile = () => {
    const cssFile: string = `
        .limuen-submenu {
            display: none;
        }
        .limuen-submenu.menu-opened {
            display: block;
        }
    `

    const style = document.createElement('style')
    style.type = 'text/css';
    style.innerHTML = cssFile;
    return style
}
let warpper: RenderResult, wrapper2: RenderResult, MenuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        warpper = render(generateMenu(testProps))
        warpper.container.append(createStyleFile())
        MenuElement = warpper.getByTestId('test-menu')
        activeElement = warpper.getByText('active')
        disabledElement = warpper.getByText('disabled')
    })
    it('should render correct Menu and MenuItem base on default props', () => {
        // 是否在文档中
        expect(MenuElement).toBeInTheDocument()
        // 测试class
        expect(MenuElement).toHaveClass('limuen-menu test')
        // 
        // expect(MenuElement.getElementsByTagName('li').length).toEqual(5)
        expect(MenuElement.querySelectorAll(':scope > li').length).toEqual(5)
        expect(activeElement).toHaveClass('limuen-menu-item is-active')
        expect(disabledElement).toHaveClass('limuen-menu-item is-disabled')
    })
    it('click items should change active and call the right callbacl', () => {
        const thirdItem = warpper.getByText('xyz');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith('2')
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveLastReturnedWith('1')
    })
    it('should render vertical mode then mode is set to vertical', () => {
        cleanup()
        const warpper = render(generateMenu(testVerProps))
        const menuElement = warpper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('limuen-menu-vertical ')
    })
    it('should show dropdown items when hover on submenu', async () => {
        expect(warpper.queryByText('drop1')).not.toBeVisible()
        const dropdownElement = warpper.getByText('dropdown')
        fireEvent.mouseEnter(dropdownElement)
        await wait(() => {
            expect(warpper.queryByText('drop1')).toBeVisible()
        })
        fireEvent.click(warpper.getByText('drop1'))
        expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
        fireEvent.mouseLeave(dropdownElement)
        await wait(() => {
            expect(warpper.queryByText('drop1')).not.toBeVisible()
        })
    })
})

describe('test Menu and MenuItem component in vertical mode', () => {
    beforeEach(() => {
        wrapper2 = render(generateMenu(testVerProps))
        wrapper2.container.append(createStyleFile())
    })
    it('should render vertical mode when mode is set to vertical', () => {
        const menuElement = wrapper2.getByTestId('test-menu')
        expect(menuElement).toHaveClass('menu-vertical')
    })
    it('should show dropdown items when click on subMenu for vertical mode', () => {
        const dropDownItem = wrapper2.queryByText('drop1')
        expect(dropDownItem).not.toBeVisible()
        fireEvent.click(wrapper2.getByText('dropdown'))
        expect(dropDownItem).toBeVisible()
    })
    it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
        expect(wrapper2.queryByText('opened1')).toBeVisible()
    })
})