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
  return (
    <div>
      <Head>
        <title>Intro Section Dropdown</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      {!isMobile ? <DesktopHeader />: <MobileHeader onClick={handleShow} />}
      <main
      >
        {isMobile ? 
        <Image src={MobileImage}  alt='mobile-image' /> 
        : <Image src={desktopImage} alt='desktop-image' /> }
        <section className='p-3 flex flex-col'>
          <h1 className='font-bold text-4xl text-center my-2'>Make remote work</h1>
          <p className='text-sm text-center text-medium-gray leading-5'>
          Get your team in sync, no matter your location. Streamline processes,create team rituals, and watch productivity soar.
          </p>
          <button className='bg-almost-black text-white p-2 px-5 mx-auto my-3 rounded-xl'>Learn More</button>
          <div className='flex items-center justify-around gap-3 mt-5'>
              {clientLogos.map((logo) => {
                return (
                  <Image width={60} key={logo.id} src={logo.image} alt={logo.alt} />
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
