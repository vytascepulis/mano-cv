import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { SubdomainData } from "@/types/types";

interface Props {
  setSubdomainData: (data: SubdomainData) => void;
}

const CodePage = ({ setSubdomainData }: Props) => {
  const { fetch } = useFetch<SubdomainData>({
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
        setSubdomainData(data);
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
