import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RedcapService } from "./redcap/redcap.service";
import { RedcapController } from "./redcap/redcap.controller";
import { StorageController } from "./storage/storage.controller";
import { StorageService } from "./storage/storage.service";
@Module({
    imports: [],
    controllers: [AppController, RedcapController, StorageController],
    providers: [AppService, RedcapService, StorageService],
})
export class AppModule {}
