import './globals.css'
import {Inter} from "next/font/google";
import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import ToasterProvider from './providers/ToasterProvider';
import LoginModal from './components/modals/LoginModal';
import getCurrentUser from './actions/getCurrentUser';
import ResModal from './components/modals/ResModal';
import SearchModal from './components/modals/SearchModal';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {

  title: 'Car Rental Pro',
  description: 'Car Rento ProMAX',
}


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  
 
    
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <ToasterProvider />
          <SearchModal />
          <ResModal />
          <RegisterModal />
          <LoginModal />
        <Navbar currentUser = {currentUser} />
        </ClientOnly>
        <br />
        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>

    </html>
  )
}

