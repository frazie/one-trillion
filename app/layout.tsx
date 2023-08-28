import ClientOnly from './components/ClientOnly'
import RegisterModal from './components/modals/RegisterModal'
import Navbar from './components/navbar/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { getUserTrees } from "./actions/getAllTrees"
import getPlantedTrees from "./actions/getTrees";
import getReferrals from "./actions/getReferrals"
import Home from './page'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'one trillion trees',
  description: 'will be the best you ever had',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()
  const Users = await getUserTrees() //trees planted by all users
  const trees = await getPlantedTrees(); //trees planted by current user
    const referrer = await getReferrals()

  return (
    <html lang="en">
      <body className={inter.className}>
          <Home currentUser={currentUser} treeData={Users} referrals={referrer} trees={trees} />      
        {/* {children} */}
        
      </body>
    </html>
  )
}
