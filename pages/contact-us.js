import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export default function ContactUs(props) {
  const { t } = useTranslation()
  console.info(props, 'contact us props')
  return (
    <div>
      <h1>{t('contact_us_title')}</h1>
      <Link href='/'>
        <a>{t('home_link')}</a>
      </Link>
    </div>
  )
}

ContactUs.getInitialProps = async () => {
  return {
    name: 'contact us page'
  }
}
