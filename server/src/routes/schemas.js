import { z } from 'zod';

const uuidParam = z.object({ id: z.uuid() });

export const menuQuerySchema = z.object({
  query: z.object({
    search: z.string().trim().max(80).optional().default(''),
    category: z.string().trim().max(80).optional().default(''),
  }),
});

export const menuItemSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    description: z.string().trim().min(10).max(1000),
    price: z.coerce.number().positive().max(9999),
    image_url: z.url(),
    category: z.string().trim().min(2).max(80).optional().default('Biryani'),
  }),
});

export const menuItemWithIdSchema = menuItemSchema.extend({ params: uuidParam });

export const orderSchema = z.object({
  body: z.object({
    customer_name: z.string().trim().min(2).max(120),
    phone: z.string().trim().min(7).max(30).regex(/^[0-9+()\-\s]+$/, 'Use a valid phone number'),
    address: z.string().trim().min(8).max(1000),
    notes: z.string().trim().max(1000).optional().default(''),
    items: z.array(z.object({
      id: z.uuid(),
      name: z.string().trim().min(2).max(120),
      price: z.coerce.number().positive(),
      quantity: z.coerce.number().int().positive().max(99),
      image_url: z.url().optional(),
    })).min(1),
    total_price: z.coerce.number().positive().max(99999),
  }),
});

export const orderStatusSchema = z.object({
  params: uuidParam,
  body: z.object({ status: z.enum(['pending', 'preparing', 'delivered']) }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6).max(200),
  }),
});
