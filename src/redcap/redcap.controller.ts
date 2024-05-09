import { Controller, Get } from "@nestjs/common";
import { RedcapService } from "./redcap.service";

@Controller("redcap")
export class RedcapController {
    constructor(private readonly redcapService: RedcapService) {}

    @Get("project-info")
    getProjectInfo() {
        return this.redcapService.fetchProjectInfo();
    }
}
