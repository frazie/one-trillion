import ClientOnly from './components/ClientOnly'
import Modal from './components/modals/Modal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'one trillion trees',
  description: 'will be the best you ever had',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Modal secondaryActionLabel='trial' actionLabel='generate referral link' title='login modal' isOpen />
          <Navbar />
        </ClientOnly>
        
        {children}
        
      </body>
    </html>
  )
}
