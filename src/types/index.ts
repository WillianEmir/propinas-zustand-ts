import { z } from "zod";
import { MenuItemSchema, ConsumoItemSchema, PropinaSchema } from "../schemas";

export type MenuItem = z.infer<typeof MenuItemSchema>
export type ConsumoItem = z.infer<typeof ConsumoItemSchema>
export type Tip = z.infer<typeof PropinaSchema>