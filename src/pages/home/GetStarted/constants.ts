import { IListItem } from "@/pages/home/GetStarted/types";
import registerImg from "@/assets/register.jpg";
import enterDataImg from "@/assets/enter-data.jpg";
import activateImg from "@/assets/activate.jpg";

export const ITEM_DELAY = 7000;

export const servicesList: IListItem[] = [
  {
    id: "register",
    title: "Užsiregistruok",
    description: "Prisijunk per Google ir sukurk savo svetainės pavadinimą",
    image: registerImg.src,
  },
  {
    id: "enter-data",
    title: "Suvesk duomenis",
    description: "Užpildyk būtinus laukelius apie save",
    image: enterDataImg.src,
  },
  {
    id: "activate",
    title: "Pasidalink savo puslapiu",
    description: "Aktyvuok svetainę ir nusiųsk nuorodą darbdaviams",
    image: activateImg.src,
  },
];
