import dynamic from 'next/dynamic'

const RegisterPage = dynamic(() => import('@/components/register-page'), {
  ssr: false,
})

export default function Register() {
  return <RegisterPage />
}

