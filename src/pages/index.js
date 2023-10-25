// hooks
import { useState, useEffect } from 'react'
// compoments
import Image from 'next/image'
import Head from 'next/head'
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css';
import MobileHeader from '@/components/MobileHeader';
import DesktopHeader from '@/components/DesktopHeader';
// images

import hamburgerIcon from '../assets/icon-menu.svg'
import MobileImage from '../assets/image-hero-mobile.png'
import desktopImage from '../assets/image-hero-desktop.png'
import logo1 from '../assets/client-databiz.svg';
import logo2 from '../assets/client-audiophile.svg';
import logo3 from '../assets/client-meet.svg';
import logo4 from '../assets/client-maker.svg';
import iconTodo from '../assets/icon-todo.svg';
import iconCalendar from '../assets/icon-calendar.svg';
import iconReminder from '../assets/icon-reminders.svg';
import iconPlanning from '../assets/icon-planning.svg';
import arrowUp from '../assets/icon-arrow-up.svg';
import arrowDown from '../assets/icon-arrow-down.svg';

export const navs = [
  {
    mainNavTitle: 'Features',
    childNav: [
      {
        title: 'Todo List',
        img: iconTodo
      },
      {
        title: 'Calendar',
        img: iconCalendar
      },
      {
        title: 'Reminders',
        img: iconReminder
      },
      {
        title: 'Planning',
        img: iconPlanning
      },
    ]
  },
  {
    mainNavTitle: 'Company',
    childNav: [
      {
        title: 'History',
        img: null
      },
      {
        title: 'Our Company',
        img: null
      },
      {
        title: 'Blog',
        img: null
      }
    ]
  },
  {
    mainNavTitle: 'Careers'
  },
  {
    mainNavTitle: 'About'
  },
]

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [navOpenState, setNavOpenState] = useState({});
  const clientLogos = [
    {
      id: 1,
      image: logo1,
      alt: 'logo1'
    },
    {
      id: 2,
      image: logo2,
      alt: 'logo2'
    },
    {
      id: 3,
      image: logo3,
      alt: 'logo3'
    },
    {
      id: 4,
      image: logo4,
      alt: 'logo4'
    },
  ]

  const [show,setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = (title) => {
    setNavOpenState((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));
  };
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if(window.innerWidth < 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  // on first render, run a function to check the size of the screen,and set ismobile accordingly
  useEffect(() => {
    if(windowWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [windowWidth])
  return (
    <div>
      <Head>
        <title>Intro Section Dropdown</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      {!isMobile ? <DesktopHeader />: <MobileHeader onClick={handleShow} />}
      <main className='md:flex md:flex-row-reverse md:justify-evenly md:items-center lg:items-stretch gap-5'
      >
        {isMobile ? 
        <Image src={MobileImage}  alt='mobile-image' /> 
        : <Image src={desktopImage} alt='desktop-image' className='max-w-md' /> }
        <section className='overflow-hidden sm:p-3 flex flex-col lg:w-2/5 lg:items-start lg:pt-14'>
          <h1 className='font-bold sm:text-4xl sm:text-center my-2 lg:text-7xl lg:text-left'>Make remote work</h1>
          <p className='text-sm sm:text-center md:text-center text-medium-gray leading-5 lg:text-left lg:text-xl lg:mt-7 lg:max-w-md'>
          Get your team in sync, no matter your location. Streamline processes,create team rituals, and watch productivity soar.
          </p>
          <button className='transition-all border-2 bg-almost-black text-almost-white p-2 px-5 sm:mx-auto md:mx-auto sm:my-3 md:my-3  rounded-xl lg:md-auto lg:ml-0 md:mt-12 hover:bg-almost-white hover:text-almost-black hover:border-almost-black hover:border-2 hover:font-bold'>Learn More</button>
          <div className='flex items-center justify-around gap-3 sm:mt-5 md:mt-5 md:w-full lg:mt-auto'>
              {clientLogos.map((logo) => {
                return (
                  <Image key={logo.id} src={logo.image} alt={logo.alt} className='sm:w-16' />
                )
              })}
          </div>
        </section>
      </main>
      <Offcanvas placement='end' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul>
            {navs.map((nav) => {
              return (
                <li className='mb-3' key={nav.mainNavTitle}>
                  <div className='flex items-center gap-3'>
                    {nav.childNav ? <a onClick={() => handleClick(nav.mainNavTitle)} href='#' className=' text-medium-gray text-base no-underline'>{nav.mainNavTitle}</a> : <a className=' text-base text-medium-gray no-underline' href='#'>{nav.mainNavTitle}</a>}
                    
                    {nav.childNav ? <Image 
                      className='cursor-pointer arrow-icon' role='button' 
                      src={ navOpenState[nav.mainNavTitle] ? arrowUp : arrowDown }
                      alt='arrow-down-icon' 
                    /> : null}
                  </div>
                  <div className={`sub-nav ${navOpenState[nav.mainNavTitle] ? 'open' : ''}`}
                  >
                    {navOpenState[nav.mainNavTitle] && nav.childNav ? (
                      <ul className='pt-3'>
                        {nav.childNav.map((child) => {
                          return (
                            <li className='flex items-center gap-3 mb-2' key={child.title}>
                              {child.img ? <Image src={child.img} alt='icon' /> : null}
                              <a href='#' className='text-medium-gray no-underline'>{child.title}</a>
                            </li>
                          )
                        })}
                      </ul>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ul>
          <div className='flex flex-col text-medium-gray'>
            <a className='text-center text-medium-gray no-underline mb-4' href='#'>Login</a>
            <button className='border-2 border-medium-gray p-2  rounded-2xl'>Register</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  )
}
