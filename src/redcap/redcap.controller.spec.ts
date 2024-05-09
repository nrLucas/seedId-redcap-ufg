import { Test, TestingModule } from "@nestjs/testing";
import { RedcapController } from "./redcap.controller";

describe("RedcapController", () => {
    let controller: RedcapController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [RedcapController],
        }).compile();

        controller = module.get<RedcapController>(RedcapController);
    });

    it("should be defined", () => {
        expect(controller).toBeDefined();
    });
});
