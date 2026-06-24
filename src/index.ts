import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import type { ContextWithPrisma } from './context/context.js';
import withPrisma from './libs/prisma.js';
import { PublicRoute } from '@/routes/route.js';
import { corsMiddleware } from './middlewares/cors.middleware.js';
import { logger } from 'hono/logger';


const app = new Hono<ContextWithPrisma>();
const route = new PublicRoute


app.use('*', logger())

app.route('/', corsMiddleware)
app.route(('/'),route.app)



serve({ fetch: app.fetch, port: 3000 })