import { Controller, Post, UploadedFiles, UseInterceptors, Body, BadRequestException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { StorageService } from "./storage.service";

@Controller("storage")
export class StorageController {
    constructor(private readonly storageService: StorageService) {}

    @Post()
    // @UseInterceptors(
    //     FilesInterceptor("images", 10, {
    //         storage: diskStorage({
    //             destination: "./uploads",
    //             filename: (req, file, callback) => {
    //                 console.log("aqui");
    //                 const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    //                 const ext = extname(file.originalname);
    //                 callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    //             },
    //         }),
    //     }),
    // )
    @UseInterceptors(FilesInterceptor("images"))
    async uploadFiles(@UploadedFiles() files: Express.Multer.File[], @Body() body) {
        try {
            const { classUser, subclassUser } = body;
            console.log("Classificação:", classUser, subclassUser);
            console.log("Arquivos:", files);

            // Salvar metadados no CSV
            await this.storageService.saveMetadataAndImages(classUser, subclassUser, files);

            return { success: true, message: "Files uploaded successfully", files };
        } catch (error) {
            console.error("Error during file upload:", error);
            throw new BadRequestException("An error occurred while uploading files.");
        }
    }
}
