import dynamic from 'next/dynamic'

const ContactsPage = dynamic(() => import('@/components/contacts/contacts-page'), {
  ssr: false,
})

export default function Contacts() {
  return <ContactsPage />
}

