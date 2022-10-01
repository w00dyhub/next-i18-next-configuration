import { appWithTranslation } from 'next-i18next'

import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import ServerCookie from 'cookies'
import BrowserCookie from 'js-cookie'

// to stores _nextI18Next for client side
let client_nextI18Next = {}

function App({ Component, pageProps }) {
  const { i18n } = useTranslation()

  const handleChangeLang = (lang) => {
    BrowserCookie.set('lang-i18next', lang)
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    client_nextI18Next = { 
      ...pageProps._nextI18Next, 
      initialLocale: i18n.language 
    }
  }, [i18n.language])

  console.info(pageProps, 'my app pageProps')

  return (
    <>
      <button onClick={() => handleChangeLang('en')}>en</button>
      <button onClick={() => handleChangeLang('th')}>th</button>
      <Component {...pageProps } />
    </>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const isServer = ctx.req
  const pageProps = {
    ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
  }
  if (!isServer) {
  // to share _nextI18Next on the client side when navigating between pages
    return {
      pageProps: {
        ...pageProps,
        _nextI18Next: client_nextI18Next
      }
    }
  }
  const { serverSideTranslations } = require('next-i18next/serverSideTranslations')
  const serverCookie = new ServerCookie(ctx.req, ctx.res)
  const initialLocale = serverCookie.get('lang-i18next')
  /**
   * by default, next-i18next will send only the active locale down to the client
   * this case the translations for both en and th locales will always be loaded regardless of the current language
   * ref => https://github.com/i18next/next-i18next
   */
  const { _nextI18Next } = await serverSideTranslations(initialLocale, ['common'], null, ['en', 'th'])
  return {
    pageProps: {
      ...pageProps,
      _nextI18Next: _nextI18Next
    }
  }
}

export default appWithTranslation(App)
