import { Route, RouteMethod } from '@chatsift/rest-utils';
import { PrismaClient } from '@prisma/client';
import type { Middleware, Request, Response } from 'polka';
import { singleton } from 'tsyringe';
import type { GuildSettings } from '../util/models.js';

@singleton()
export default class extends Route<GuildSettings, never> {
	public info = {
		method: RouteMethod.get,
		path: '/somebot/v1/hello/',
	} as const;

	public override middleware: Middleware[] = [];

	public constructor(private readonly prisma: PrismaClient) {
		super();
	}

	public handle(req: Request, res: Response) {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({ hello: 'world' }));
	}
}
