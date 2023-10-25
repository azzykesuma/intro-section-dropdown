import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
// images
import hamburgerIcon from '../assets/icon-menu.svg'
import logoImage from '../assets/logo.svg'
import arrowUp from '../assets/icon-arrow-up.svg';
import arrowDown from '../assets/icon-arrow-down.svg';
// other
import {navs} from '../pages/index'
function DesktopHeader() {
    const [navOpenState, setNavOpenState] = useState({});

    useEffect(() => {
        const defaultNavOpenState = {};
        navs.forEach((nav) => {
            defaultNavOpenState[nav.mainNavTitle] = false;
        });
        setNavOpenState(defaultNavOpenState);
    }, []);
    const handleMouseEnter = (title) => {
        setNavOpenState((prevState) => {
            const newState = {};
            Object.keys(prevState).forEach((key) => {
                newState[key] = key === title ? !prevState[key] : false;
            });
            return {
                ...prevState,
                ...newState,
            };
        });
    };
    const handleMouseLeave = (title) => {
        setNavOpenState((prevState) => ({
            ...prevState,
            [title]: !prevState[title],
        }));
    }
  return (
    <div className='p-4 grid grid-cols-[10%_70%_10%_10%] items-center'>
        <Image className='cursor-pointer' src={logoImage} alt='logo' />
        <div className='flex gap-4'>
            <div className='flex items-center gap-5 pb-2.5'>
            {navs.map((nav) => {
                return (
                    <li className='list-none relative' key={nav.mainNavTitle}>
                        { nav.childNav ? 
                            <a 
                                className='flex gap-2 items-center text-base text-medium-gray no-underline hover:text-almost-black' href='#'
                                onMouseEnter={() => {handleMouseEnter(nav.mainNavTitle)}}
                                >{nav.mainNavTitle} 
                                <span className='pt-1'><Image src={navOpenState[nav.mainNavTitle] ? arrowUp : arrowDown } alt='icon-arrow-down'/></span></a> 
                            : <a onMouseEnter={() => {handleMouseEnter(nav.mainNavTitle)}} className=' text-base text-medium-gray no-underline hover:text-almost-black' href='#'>{nav.mainNavTitle}</a>
                        }
                        {/* sub nav container */}
                        {navOpenState[nav.mainNavTitle] && nav.childNav ? (
                            <div 
                                className='absolute bg-white w-40 translate-y-4'
                                onMouseLeave={() => {handleMouseLeave(nav.mainNavTitle)}}
                                >
                                <ul className='py-3 px-3 nav-box mb-0 rounded-lg'>
                                    {nav.childNav.map((child) => {
                                        return (
                                            <li className='flex items-center gap-3 mb-2' key={child.title}>
                                                {child.img ? <Image src={child.img} alt='icon' /> : null}
                                                <a href='#' className='text-medium-gray no-underline hover:text-almost-black'>{child.title}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ) : null}
                    </li>
                )
            })}
            </div>
        </div>
        <a className='text-center text-medium-gray no-underline' href='#'>Login</a>
        <button className='border-2 border-medium-gray p-2  rounded-2xl'>Register</button>
    </div>
  )
}

export default DesktopHeader;
