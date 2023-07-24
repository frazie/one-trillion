'use client'

import ClientOnly from './components/ClientOnly';
import Container from './components/Container';

import useLoginModal from './hooks/useLoginModal';
import useRegisterModal from './hooks/useRegisterModal';

export default function Home() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  return (
      <ClientOnly>
        <Container>
        <div  className="py-20">
          <div>
            Welcome to you one Trillion trees
            <br />
            Sign up to contribute to something great!!
            <br />
            
          </div>
        </div>
      
        </Container>
      </ClientOnly>
      
    
  );
};
