import dynamic from 'next/dynamic'

const ContactsPage = dynamic(() => import('@/components/contacts/contacts-page'), {
  ssr: false, // Desabilita o SSR para este componente
})

export default function Contacts() {
  return <ContactsPage />
}
