import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import RegisterModalContent from "@/components/Navbar/RegisterModalContent";
import LoginModalContent from "@/components/Navbar/LoginModalContent";
import { parseQueryString } from "@/utils/queryString";

const LoginBtn = () => {
  const session = useSession();
  const isLoading = session.status === "loading";
  const isUnauthenticated = session.status === "unauthenticated";
  const isAuthenticated = session.status === "authenticated";
  const isInitialized = session.data?.user.status === "INITIALIZED";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prevState) => !prevState);

  useEffect(() => {
    if (parseQueryString()?.status === "initialized") {
      setIsModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="ml-auto">
      {isLoading && (
        <div className="flex min-w-[100px] justify-center">
          <Loader />
        </div>
      )}
      {(isUnauthenticated || isInitialized) && (
        <Button onClick={toggleModal}>
          {isInitialized ? "Registruotis" : "Prisijungti"}
        </Button>
      )}
      {isAuthenticated && !isInitialized && <>user pic</>}
      {!session.data?.user.subdomainSlug && (
        <Modal isOpen={isModalOpen} handleClose={toggleModal}>
          {isInitialized && <RegisterModalContent />}
          {!isInitialized && <LoginModalContent />}
        </Modal>
      )}
    </div>
  );
};

export default LoginBtn;
