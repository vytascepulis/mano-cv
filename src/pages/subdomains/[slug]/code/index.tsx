import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { UserData } from "@/types/types";

interface Props {
  setSubdomainData: (subdomainData: UserData["subdomain"]) => void;
}

const CodePage = ({ setSubdomainData }: Props) => {
  const { fetch } = useFetch<UserData>({
    endpoint: "subdomain",
    method: "POST",
  });
  const [code, setCode] = useState("");

  const handleOnSubmit = () => {
    fetch({
      body: {
        code,
      },
      onSuccess: (data) => {
        setSubdomainData(data.subdomain);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <input
        onChange={(e) => setCode(e.target.value)}
        value={code}
        type="text"
        placeholder="Enter code"
      />
      <button type="button" onClick={handleOnSubmit}>
        Submit
      </button>
    </>
  );
};

export default CodePage;
