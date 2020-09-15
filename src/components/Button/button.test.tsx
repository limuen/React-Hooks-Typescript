import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './button';

const defaultProps = {
    onClick: jest.fn()
}

const testProps: ButtonProps = {
    btnType: ButtonType.Primary,
    size: ButtonSize.Large,
    className: 'klass'
}

const disabledProps: ButtonProps = {
    disabled: true,
    onClick: jest.fn()
}

describe('test Button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button {...defaultProps}>按钮</Button>)
        // getByText直接获取标签
        const element = wrapper.getByText('按钮') as HTMLButtonElement
        // 判断是否出现在文档中
        expect(element).toBeInTheDocument()
        // 是否有button元素 tagName都是大写的标签名
        expect(element.tagName).toEqual('BUTTON');
        // 是否有className toHaveClass
        expect(element).toHaveClass('limuen-btn limuen-btn-default')
        // 是否为真
        expect(element.disabled).toBeFalsy()
        // 调用click方法
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled()
    })
    it('should render the correct component based on different props', () => {
        const wrapper = render(<Button {...testProps}>按钮</Button>)
        // getByText直接获取标签
        const element = wrapper.getByText('按钮')
        // 判断是否出现在文档中
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('limuen-btn-primary limuen-btn-lg klass')
    })
    it('should render a link when btnType equals link and href is procided', () => {
        const wrapper = render(<Button btnType={ButtonType.Link} href="http://limuen.cn">Link</Button>)
        // getByText直接获取标签
        const element = wrapper.getByText('Link')
        // 判断是否出现在文档中
        expect(element).toBeInTheDocument();
        // 是否有button元素 tagName都是大写的标签名
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('limuen-btn limuen-btn-link')
    })
    it('should render disabled button whtn disabled set to true', () => {
        const wrapper = render(<Button {...disabledProps}>按钮</Button>)
        // getByText直接获取标签
        const element = wrapper.getByText('按钮') as HTMLButtonElement
        // 判断是否出现在文档中
        expect(element).toBeInTheDocument()
        // 是否为真
        expect(element.disabled).toBeTruthy();
        // 触发click
        fireEvent.click(element);
        // click事件没有被调用
        expect(disabledProps.onClick).not.toHaveBeenCalled()
    })
})