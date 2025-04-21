import { SubdomainData, UserSubdomainQueryResponse } from "@/types/types";

export const formatSubdomainData = (
  data: UserSubdomainQueryResponse,
): SubdomainData => {
  const { code: _code, ...restSubdomain } = data.subdomain;

  return {
    ...data,
    subdomain: restSubdomain,
  };
};
