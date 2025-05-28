import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useState } from "react";
import Checkbox from "@/components/ui/Checkbox";
import useFetch from "@/hooks/useFetch";
import { signOut } from "next-auth/react";
import { getDomainUrl } from "@/utils/subdomain";

const DeleteAccountBtn = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fakeLoading, setFakeLoading] = useState(false);

  const { isLoading, fetch } = useFetch<string>({
    endpoint: "account/my",
    method: "DELETE",
  });

  const handleDeleteAccount = () => {
    if (!checked) {
      return;
    }

    setFakeLoading(true);

    fetch({
      onSuccess: () => {
        signOut().then(() => {
          window.location.href = getDomainUrl();
        });
      },
      onError: () => {
        setFakeLoading(false);
      },
    });
  };

  return (
    <>
      <Button onClick={() => setConfirmModal(true)} color="danger">
        Pašalinti
      </Button>
      <Modal
        isOpen={confirmModal}
        handleClose={() => setConfirmModal(false)}
        className="max-w-[400px]"
      >
        <div className="p-3">
          <h1 className="text-dark mb-[10px] text-2xl font-semibold">
            Ištrinti paskyrą
          </h1>
          <p className="mb-5">Tavo paskyra bus panaikinta negrįžtamai</p>
          <div className="flex flex-col gap-3">
            <div>
              <Checkbox
                checked={checked}
                onChange={setChecked}
                label="Suprantu ir sutinku"
                name="delete-account-checkbox"
              />
            </div>
            <Button
              disabled={!checked}
              color="danger"
              onClick={handleDeleteAccount}
              loading={isLoading || fakeLoading}
            >
              Ištrinti
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteAccountBtn;
