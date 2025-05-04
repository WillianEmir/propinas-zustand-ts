import { z } from 'zod'

export const MenuItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  show: z.boolean()
})

export const ConsumoItemSchema = MenuItemSchema.extend({
  quantity: z.number()
})

export const PropinaSchema = z.object({
  id: z.string(),
  value: z.number(),
  label: z.string()
})