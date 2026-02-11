import { Controller, Get, Route, Tags } from "@tsoa/runtime";

@Route("health")
@Tags("Health")
export class HealthController extends Controller {
  @Get("/")
  public getHealth(): { status: string; timestamp: string; uptime: number } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
