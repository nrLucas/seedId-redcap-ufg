import { Injectable } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import * as csvWriter from "csv-writer";
import * as moment from "moment";

@Injectable()
export class StorageService {
    private readonly metadataFilePath = path.join("C:\\Users\\gusta\\OneDrive\\Documentos\\Lucas\\Sementes\\seedId-redcap-ufg\\", "storage", "metadata.csv");
    private readonly imagesFolderPath = path.join("C:\\Users\\gusta\\OneDrive\\Documentos\\Lucas\\Sementes\\seedId-redcap-ufg\\", "storage", "images");

    constructor() {
        // Create directories if they don't exist
        if (!fs.existsSync(this.imagesFolderPath)) {
            fs.mkdirSync(this.imagesFolderPath, { recursive: true });
        }

        if (!fs.existsSync(this.metadataFilePath)) {
            const writer = csvWriter.createObjectCsvWriter({
                path: this.metadataFilePath,
                header: [
                    { id: "uniqueId", title: "UniqueId" },
                    { id: "classUser", title: "ClassUser" },
                    { id: "subclassUser", title: "SubclassUser" },
                    { id: "date", title: "Date" },
                ],
                append: true,
            });
            writer.writeRecords([]); // Create the file if it doesn't exist
        }
    }

    async saveMetadataAndImages(classUser: string, subclassUser: string, files: Express.Multer.File[]): Promise<void> {
        const records = [];
        const uniqueId = uuidv4();
        const date = moment().format("YYYY-MM-DD");

        console.log("classUser", classUser);
        console.log("subclassUser", subclassUser);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const filename = `${uniqueId}-${classUser}-${i + 1}.png`;
            const filePath = path.join(this.imagesFolderPath, filename);

            // Verifique se o buffer do arquivo está definido
            if (file.buffer) {
                // Save image to disk
                fs.writeFileSync(filePath, file.buffer);
            } else {
                console.error(`File buffer is undefined for file: ${file.originalname}`);
            }

            // Prepare CSV record
            records.push({ uniqueId, classUser, subclassUser, date });
        }

        // Append metadata to CSV file
        const writer = csvWriter.createObjectCsvWriter({
            path: this.metadataFilePath,
            header: [
                { id: "uniqueId", title: "UniqueId" },
                { id: "classUser", title: "ClassUser" },
                { id: "subclassUser", title: "SubclassUser" },
                { id: "date", title: "Date" },
            ],
            append: true,
        });
        await writer.writeRecords(records);
    }
}

//1 - NOME CIENTIFICO
//2 - NOME POPULAR
