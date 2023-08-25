import React, { useEffect, useRef } from 'react'

import { Link, useLocation } from 'react-router-dom'

import './header.scss'

import logo from '../../assets/logo.png';

const headerNav = [
    {
        display: 'Home',
        path: '/'
    },
    {
        display: 'Movies',
        path: '/movie'
    },
    {
        display: 'TV Series',
        path: '/tv'
    },
]

const Header = () => {

    const { pathname } = useLocation(); // hook useLocation để lấy thông tin về địa chỉ URL hiện tại.
    const headerRef = useRef(null)

    const active = headerNav.findIndex(e => e.path === pathname) // active để xác định chỉ số của mục hiện tại trong menu dựa trên địa chỉ URL hiện tại.

    useEffect(() => {
        const shrinkHeader = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {    //Nếu cuộn lên màn hình đã vượt quá 100px,
                headerRef.current.classList.add('shrink')       // lớp shrink sẽ được thêm vào phần tử header.
            } else {
                headerRef.current.classList.remove('shrink')    // ngược lại xoá shrink 
            }
        }
        window.addEventListener('scroll', shrinkHeader) // Thêm một sự kiện nghe khi trình duyệt cuộn trang. 
        return () => {
            window.removeEventListener('scroll', shrinkHeader)
        }
    }, [])


    return (
        <div ref={headerRef} className='header'>
            <div className="header__wrap container">
                <div className="logo">
                    <img src={logo} alt="" />
                    <Link to="/">MyMovies</Link>
                </div>
                <ul className="header__nav">
                    {headerNav.map((e, i) => (          //.map để tạo từng li cho mỗi mục trong headerNav, và thêm lớp active nếu mục đó đang được chọn.
                        <li key={i} className={`${i === active ? 'active' : ''}`}>
                            <Link to={e.path}>
                                {e.display}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Header