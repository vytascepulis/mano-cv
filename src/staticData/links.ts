export interface ILink {
  href: string;
  title: string;
  slug: string;
}

export const legalLinks: ILink[] = [
  {
    href: "#",
    title: "Naudojimosi taisyklės",
    slug: "terms-and-conditions",
  },
  { href: "#", title: "Slapukų politika", slug: "cookie-policy" },
  { href: "#", title: "Privatumo politika", slug: "privacy-policy" },
];

export const additionalLinks: ILink[] = [
  { href: "#", title: "Kontaktai", slug: "contacts" },
];

export const getLinkBySlug = (slug: ILink["slug"]) => {
  const links = [...legalLinks, ...additionalLinks];
  return links.find((link) => link.slug === slug);
};
