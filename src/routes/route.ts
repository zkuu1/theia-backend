import { Hono } from 'hono';
import userController from "@/modules/users/user/user.controller"

export class PublicRoute  {
    public app: Hono;

    constructor() {
        this.app = new Hono();
        this.routes();
  }

  private routes() {
    this.app.route('/api', userController);
  }
}