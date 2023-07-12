'use client'

import Container from './components/Container';

import useLoginModal from './hooks/useLoginModal';
import useRegisterModal from './hooks/useRegisterModal';

export default function Home() {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()

  return (
    <div className=''>
      <Container>
        <div  className="py-20">
          <div>
            Welcome to you one Trillion trees

            Sign up to contribute to something great!!
            <br />
            <button onClick={registerModal.onOpen}>Sign up here</button>
            <br />
            <button onClick={loginModal.onOpen}>Login</button>
          </div>
        </div>
      
      </Container>
      
    </div>
  );
};
