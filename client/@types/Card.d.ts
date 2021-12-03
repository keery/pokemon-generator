import { Element } from "~@types/CardGenerator";

export interface Card {
  id: number;
  name: string;
  slug: string;
  hp: string;
  element: Element;
  description: string;
  attack1Name: string;
  attack1Description: string;
  attack2Name: string;
  attack2Description: string;
  isPublished: boolean;
  img: string;
  blurHash: string;
  has_liked?: number;
  likes?: number;
}
