import { Element } from "~@types/CardGenerator";
import { Card } from "~@types/Card";

export interface Winner {
  id: number;
  clap: number;
  card: Card;
  created_at: Date;
  updated_at: Date;
}
