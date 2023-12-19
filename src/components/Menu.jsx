import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import "./Menu.css"
const items = [
    {
        label: (
            <Link to='/'>Welcome</Link>
        ),
        key: 'home',
    },
    {
        label: (
            <Link to='/products'>Product</Link>
        ),
        key: 'product',
    },
    {
        label: (
            <Link to='/manage-product'>Manage Product</Link>
        ),
        key: 'manage-product',
    },
    {
        label: (
            <Link to='/login'>Login</Link>
        ),
        key: 'login',
    },
];
const MainMenu = () => {
    const [current, setCurrent] = useState('home');
    const location = useLocation();

    const onClick = (e) => {
        setCurrent(location.pathname)
    };


    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ width: '100%',  fontSize: '15px', flex: "auto" }} />
        </>
    );
};

export default MainMenu;
