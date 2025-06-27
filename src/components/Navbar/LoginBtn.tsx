import { useSession } from "next-auth/react";
import Loader from "@/components/ui/Loader";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useEffect } from "react";
import RegisterModalContent from "@/components/Navbar/RegisterModalContent";
import LoginModalContent from "@/components/Navbar/LoginModalContent";
import { parseQueryString } from "@/utils/queryString";
import UserBtn from "@/components/Navbar/UserBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useGlobalContext } from "@/contexts/GlobalContext";

const LoginBtn = () => {
  const session = useSession();
  const isLoading = session.status === "loading";
  const isUnauthenticated = session.status === "unauthenticated";
  const isAuthenticated = session.status === "authenticated";
  const isInitialized = session.data?.user.userStatus === "INITIALIZED";

  const { toggleLoginModal, loginModalOpen, setLoginModalOpen } =
    useGlobalContext();

  useEffect(() => {
    if (parseQueryString()?.status === "initialized") {
      setLoginModalOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <div className="ml-auto flex">
      {isLoading && <Loader variant="dark" />}
      {!isLoading && (isUnauthenticated || isInitialized) && (
        <Button className="h-[34px]" onClick={toggleLoginModal}>
          <FontAwesomeIcon icon={faUser} />
          <span className="hidden md:block">
            {isInitialized ? "Registruotis" : "Prisijungti"}
          </span>
        </Button>
      )}
      {isAuthenticated && !isInitialized && <UserBtn />}
      {!session.data?.user.subdomainSlug && (
        <Modal
          isOpen={loginModalOpen}
          handleClose={toggleLoginModal}
          className="max-w-[700px]"
        >
          {isInitialized && <RegisterModalContent />}
          {!isInitialized && <LoginModalContent />}
        </Modal>
      )}
    </div>
  );
};

export default LoginBtn;
