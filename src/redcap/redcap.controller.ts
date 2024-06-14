import { Controller, Get, Query, Res, Post, Body, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

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

    @Post("upload-file")
    @UseInterceptors(FileInterceptor("imagem"))
    async uploadFile(@Query("recordId") recordId: string, @UploadedFile() imagem: Express.Multer.File, @Res() res: Response) {
        try {
            console.log("file2222", imagem);
            const result = await this.redcapService.insertFileREDCap2(recordId, imagem);
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to upload file", error: error.message });
        }
    }

    @Post("upload-fileRepository")
    @UseInterceptors(FileInterceptor("imagem"))
    async FileRepository(@UploadedFile() imagem: Express.Multer.File, @Res() res: Response) {
        try {
            console.log("file", imagem);
            const result = await this.redcapService.importFileRepository(imagem);
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to upload file", error: error.message });
        }
    }

    @Post("update-record")
    async createOrUpdateRecord(@Body() recordData: any, @Res() res: Response) {
        try {
            // Assumindo que o ID do registro está no corpo da solicitação
            // const maxInstance = await this.redcapService.getMaxRepeatInstance("300");
            // console.log("Max Repeat Instance:", maxInstance);
            const result = await this.redcapService.insertRecord(recordData);
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to update or create record", error: error.message });
        }
    }

    @Post("list-file-repository")
    async listFileRepository(@Res() res: Response) {
        try {
            const result = await this.redcapService.listFileRepository();
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to list file repository", error: error.message });
        }
    }

    @Post("upload-file2")
    @UseInterceptors(FileInterceptor("imagem"))
    async uploadFile2(
        @Query("recordId") recordId: string,
        @Query("fieldName") fieldName: string,
        @Query("event") event: string,
        @Query("repeat_instance") repeat_instance: number = 1,
        @UploadedFile() imagem: Express.Multer.File,
        @Res() res: Response,
    ) {
        try {
            console.log("weerwrwe", imagem);
            const result = await this.redcapService.importFile(recordId, fieldName, imagem, event, repeat_instance);
            res.send(result);
        } catch (error) {
            res.status(500).send({ message: "Failed to upload file", error: error.message });
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
