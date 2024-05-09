import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RedcapService } from "./redcap/redcap.service";
import { RedcapController } from "./redcap/redcap.controller";

@Module({
    imports: [],
    controllers: [AppController, RedcapController],
    providers: [AppService, RedcapService],
})
export class AppModule {}
