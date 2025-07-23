export interface ILink {
  href: string;
  title: string;
  slug: string;
}

export const legalLinks: ILink[] = [
  {
    href: ``,
    // href: `${getDomainUrl()}/naudojimosi-taisykles`,
    title: "Naudojimosi taisyklės",
    slug: "terms-and-conditions",
  },
  {
    href: ``,
    // href: `${getDomainUrl()}/slapuku-politika`,
    title: "Slapukų politika",
    slug: "cookie-policy",
  },
  {
    href: ``,
    // href: `${getDomainUrl()}/privatumo-politika`,
    title: "Privatumo politika",
    slug: "privacy-policy",
  },
];

export const getLinkBySlug = (slug: ILink["slug"]) => {
  const links = [...legalLinks];
  return links.find((link) => link.slug === slug);
};
