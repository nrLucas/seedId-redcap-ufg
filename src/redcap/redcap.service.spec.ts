import { Test, TestingModule } from "@nestjs/testing";
import { RedcapService } from "./redcap.service";

describe("RedcapService", () => {
    let service: RedcapService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RedcapService],
        }).compile();

        service = module.get<RedcapService>(RedcapService);
    });

    it("should be defined", () => {
        expect(service).toBeDefined();
    });
});
