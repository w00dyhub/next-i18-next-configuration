import { useTranslation } from 'next-i18next'
import Link from 'next/link'

export async function getServerSideProps() {
  return {
    props: { name: 'about us page' },
  }
}

export default function AboutUs(props) {
  const { t } = useTranslation()
  console.info(props, 'about us props')
  return (
    <div>
      <h1>{t('about_us_title')}</h1>
      <Link href='/'>
      <a>{t('home_link')}</a>
      </Link>
    </div>
  )
}
