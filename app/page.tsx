import dynamic from 'next/dynamic'

const WelcomePage = dynamic(() => import('@/components/welcome-page'), {
  ssr: false,
})

export default function Home() {
  return <WelcomePage />
}

