import { Controller, Get, Query, Res, Post, Body } from "@nestjs/common";
import { RedcapService } from "./redcap.service";
import { Response } from "express";

@Controller("redcap")
export class RedcapController {
    constructor(private readonly redcapService: RedcapService) {}

    //localhost:3001/redcap/project-info
    @Get("project-info")
    getProjectInfo() {
        return this.redcapService.fetchProjectInfo();
    }

    //localhost:3001/redcap/project-records
    @Get("project-records")
    getProjectRecords() {
        return this.redcapService.fetchProjectRecords();
    }

    //localhost:3001/redcap/fetch-record?recordId=1
    @Get("fetch-record")
    fetchRecordById(@Query("recordId") recordId: string) {
        return this.redcapService.fetchRecordById(recordId);
    }

    //localhost:3001/redcap/fetch-file?recordId=1&fieldName=imagem_sem_prop_1
    @Get("fetch-file")
    async fetchFile(@Query("recordId") recordId: string, @Query("fieldName") fieldName: string, @Res() res: Response) {
        const imageBuffer = await this.redcapService.fetchFileFromREDCap(recordId, fieldName);
        res.setHeader("Content-Type", "image/jpeg");
        res.send(imageBuffer);
    }

    @Post("update-record")
    async createOrUpdateRecord(@Body() recordData: any, @Res() res: Response) {
        try {
            const result = await this.redcapService.insertRecord(recordData);
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to update or create record", error: error.message });
        }
    }
}

// const teste = {
//     termo_colaboracao: 1, // QUANDO PREENCHIDO
//     especie_val: "teste",
//     sinonimia_bot: "teste",
//     uf_ocorrencia_sp: "GO",
//     tipo_coord_geogr: "1",
//     fotografo_sem_prop: "teste",
// };
