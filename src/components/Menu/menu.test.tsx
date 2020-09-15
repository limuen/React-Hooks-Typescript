import React from 'react';
import { fireEvent, render, RenderResult, cleanup } from '@testing-library/react';
import Menu, { MenuProps } from './menu';
import MenuItem from './menuItem';

const testProps: MenuProps = {
    defaultIndex: 0,
    onSelect: jest.fn(),
    className: 'test'
}

const testVerProps: MenuProps = {
    defaultIndex: 0,
    mode: "vertical",
}

const generateMenu = (props: MenuProps) => {
    return (
        <Menu {...props}>
            <MenuItem >active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem >xyz</MenuItem>
        </Menu>
    )

}
let warpper: RenderResult, MenuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        warpper = render(generateMenu(testProps))
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
        expect(MenuElement.getElementsByTagName('li').length).toEqual(3)
        expect(activeElement).toHaveClass('limuen-menu-item is-active')
        expect(disabledElement).toHaveClass('limuen-menu-item is-disabled')
    })
    it('click items should change active and call the right callbacl', () => {
        const thirdItem = warpper.getByText('xyz');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('is-active')
        expect(activeElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).toHaveBeenCalledWith(2)
        fireEvent.click(disabledElement)
        expect(disabledElement).not.toHaveClass('is-active')
        expect(testProps.onSelect).not.toHaveLastReturnedWith(1)
    })
    it('should render vertical mode then mode is set to vertical', () => {
        cleanup()
        const warpper = render(generateMenu(testVerProps))
        const menuElement = warpper.getByTestId('test-menu')
        expect(menuElement).toHaveClass('limuen-menu-vertical ')
    })
})