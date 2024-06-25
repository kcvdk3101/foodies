import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

import logoImage from '@/assets/logo.png'

import MainHeaderBackground from './main-header-background'
import classes from './main-header.module.css'
import NavLink from './nav-link'

export default function MainHeader() {
  return (
    <Fragment>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImage} priority alt="A plate with food on it" />
          Foodies
        </Link>
        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">
                Browse Meals
              </NavLink>
            </li>
            <li>
              <NavLink href="/community">
                Community
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </Fragment>
  )
}
