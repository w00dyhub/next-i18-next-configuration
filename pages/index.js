import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function Home(props) {
  const { t } = useTranslation()
  console.info(props, 'home props')
  return (
    <div>
      <h1>{t('home_title')}</h1>
      <div>
        <Link href='/about-us'>
          <a>{t('about_us_link')}</a>
        </Link>
      </div>
      <div>
        <Link href='/contact-us'>
          <a>{t('contact_us_link')}</a>
        </Link>
      </div>
    </div>
  )
}
