import { Injectable } from "@nestjs/common";
import axios from "axios";
import * as qs from "qs";

@Injectable()
export class RedcapService {
    private readonly apiUrl = "https://redcap.prpi.ufg.br/api/";
    private readonly apiKey = "F5CE8BF137826E42A317CC63465FA26B";

    async fetchProjectInfo(): Promise<any> {
        try {
            const response = await axios.post(
                this.apiUrl,
                qs.stringify({
                    token: this.apiKey,
                    content: "project",
                    format: "json",
                    returnFormat: "json",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );

            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching project information:", error);
        }
    }

    async fetchProjectRecords(): Promise<any> {
        try {
            const response = await axios.post(
                this.apiUrl,
                qs.stringify({
                    token: this.apiKey,
                    content: "record",
                    format: "json",
                    returnFormat: "json",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );

            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching project information:", error);
        }
    }

    async fetchRecordById(recordId: string): Promise<any> {
        try {
            const response = await axios.post(
                this.apiUrl,
                qs.stringify({
                    token: this.apiKey,
                    content: "record",
                    format: "json",
                    returnFormat: "json",
                    records: [recordId], // Especificando o ID do registro
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        // "Content-Type": "multipart/form-data",
                    },
                },
            );

            console.log("Record data", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching record information:", error);
            throw new Error("Failed to fetch record information");
        }
    }

    async fetchFileFromREDCap(recordId: string, fieldName: string): Promise<Buffer> {
        try {
            const response = await axios.post(
                this.apiUrl,
                qs.stringify({
                    token: this.apiKey,
                    content: "file",
                    action: "export",
                    record: recordId,
                    field: fieldName,
                    returnFormat: "json",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    responseType: "arraybuffer", // Importante para dados binários
                },
            );
            return response.data; // Retorna os dados binários do arquivo
        } catch (error) {
            console.error("Error fetching file from REDCap:", error);
            throw new Error("Failed to fetch file from REDCap");
        }
    }

    // async insertRecord(data: any): Promise<any> {
    //     try {
    //         const response = await axios.post(
    //             this.apiUrl,
    //             qs.stringify({
    //                 token: this.apiKey,
    //                 content: "record",
    //                 format: "json",
    //                 returnFormat: "json",
    //                 type: "flat",
    //                 data: JSON.stringify([data]), // Adiciona os dados como uma string JSON
    //             }),
    //             {
    //                 headers: {
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                 },
    //             },
    //         );

    //         console.log("Response", response.data);
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error sending data to REDCap:", error);
    //     }
    // }

    async getMaxRepeatInstance(recordId: string): Promise<number> {
        try {
            const records = await this.fetchRecordById(recordId);
            const maxInstance = Math.max(...records.map((record: any) => record.redcap_repeat_instance || 0));
            return maxInstance;
        } catch (error) {
            console.error("Error fetching max repeat instance:", error);
            throw new Error("Failed to fetch max repeat instance");
        }
    }

    async listFileRepository(): Promise<any> {
        try {
            const response = await axios.post(
                this.apiUrl,
                qs.stringify({
                    token: this.apiKey,
                    content: "fileRepository",
                    action: "list",
                    format: "json",
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            );

            console.log("response", response.data);
            return response.data;
        } catch (error) {
            console.error("Error listing file repository:", error);
            throw new Error("Failed to list file repository");
        }
    }

    // async insertFileREDCap2(recordId: string, file: any): Promise<Buffer> {
    //     try {
    //         const response = await axios.post(
    //             this.apiUrl,
    //             qs.stringify({
    //                 token: this.apiKey,
    //                 content: "file",
    //                 action: "import",
    //                 record: recordId,
    //                 field: "imagem_sem_prop_1",
    //                 file: file,
    //                 returnFormat: "json",
    //             }),
    //             {
    //                 headers: {
    //                     "Content-Type": "multipart/form-data",
    //                 },
    //             },
    //         );
    //         return response.data; // Retorna os dados binários do arquivo
    //     } catch (error) {
    //         console.error("Error fetching file from REDCap:", error);
    //         throw new Error("Failed to fetch file from REDCap");
    //     }
    // }

    // async insertFileREDCap(recordId: string, file: any): Promise<any> {
    //     try {
    //         const form = new FormData();
    //         form.append("token", this.apiKey);
    //         form.append("content", "file");
    //         form.append("action", "import");
    //         form.append("record", recordId);
    //         form.append("field", "imagem_sem_prop_1");
    //         form.append("file", file);
    //         form.append("returnFormat", "json");

    //         const response = await axios.post(this.apiUrl, form, {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //             },
    //         });

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error uploading file to REDCap:", error);
    //         throw new Error("Failed to upload file to REDCap");
    //     }
    // }
    // async importFileRepository(file: any): Promise<any> {
    //     try {
    //         // const form = new FormData();
    //         // form.append("token", this.apiKey);
    //         // form.append("content", "fileRepository");
    //         // form.append("action", "import");
    //         // form.append("file", file);
    //         // form.append("returnFormat", "json");
    //         // form.append("folder_id", "4");

    //         // const response = await axios.post(this.apiUrl, form, {
    //         //     headers: {
    //         //         "Content-Type": "application/x-www-form-urlencoded",
    //         //     },
    //         // });

    //         // return response.data;

    //         // console.log("FILE", file);
    //         // const fileBase64 = file.buffer.toString("base64");
    //         // console.log("fileBase64", fileBase64);

    //         const file2 = fs.createReadStream("C:\\Users\\gusta\\Downloads\\semente.jpg");
    //         console.log("file", file2);
    //         const response = await axios.post(
    //             this.apiUrl,
    //             qs.stringify({
    //                 token: this.apiKey,
    //                 content: "fileRepository",
    //                 action: "import",
    //                 file: "semente.jpg",
    //                 folder_id: 4,

    //                 returnFormat: "json",
    //                 // data: JSON.stringify([data]), // Adiciona os dados como uma string JSON
    //             }),
    //             {
    //                 headers: {
    //                     //"Content-Type": "image/jpeg",
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                 },
    //             },
    //         );
    //         return response.data;
    //     } catch (error) {
    //         console.error("Error listing file repository:", error);
    //         throw new Error("Failed to list file repository");
    //     }
    // }

    // async importFile(recordId: string, fieldName: string, file: any, event?: string, repeat_instance: number = 1): Promise<any> {
    //     try {
    //         // Convert the file buffer to a base64 string

    //         console.log("file", file);
    //         const fileBase64 = file.buffer.toString("base64");

    //         const data = {
    //             token: this.apiKey,
    //             content: "file",
    //             action: "import",
    //             record: recordId,
    //             field: fieldName,
    //             file: JSON.stringify([file]),
    //             repeat_instance: 1,
    //             returnFormat: "json",
    //         };

    //         const response = await axios.post(this.apiUrl, qs.stringify(data), {
    //             headers: {
    //                 "Content-Type": "application/x-www-form-urlencoded",
    //             },
    //         });

    //         return response.data;
    //     } catch (error) {
    //         console.error("Error uploading file to REDCap:", error);
    //         throw new Error("Failed to upload file to REDCap");
    //     }
    // }
}

// {
//     "proj_id": "teste",
//     "termo_colaboracao": 1, // REQ
//     "familia_bot1": "teste",
//     "especie_val": "teste", // REQ
//     "sinonimia_bot": "teste", // REQ
//     "sinonimia_bot1": "teste",
//     "sinonimia_bot2": "teste",
//     "sinonimia_bot3": "teste",
//     "sinonimia_bot4": "teste",
//     "sinonimia_bot5": "teste",
//     "sinonimia_bot6": "teste",
//     "sinonimia_bot7": "teste",
//     "sinonimia_bot8": "teste",
//     "sinonimia_bot9": "teste",
//     "sinonimia_bot10": "teste",
//     "sinonimia_bot11": "teste",
//     "sinonimia_bot12": "teste",
//     "sinonimia_bot13": "teste",
//     "sinonimia_bot14": "teste",
//     "sinonimia_bot15": "teste",
//     "sinonimia_bot16": "teste",
//     "sinonimia_bot17": "teste",
//     "sinonimia_bot18": "teste",
//     "sinonimia_bot19": "teste",
//     "sinonimia_bot20": "teste",

//     "nome_pop1": "teste",
//     "nome_pop2": "teste",
//     "nome_pop3": "teste",
//     "nome_pop4": "teste",
//     "nome_pop5": "teste",
//     "nome_pop6": "teste",
//     "nome_pop7": "teste",
//     "nome_pop8": "teste",
//     "nome_pop9": "teste",
//     "nome_pop10": "teste",

//     "uf_ocorrencia_sp": "GO", // REQ
//     "tipo_coord_geogr": "1", // REQ

//     "latitude_geogr_sp": "teste",
//     "longitude_utm_sp": "teste",

// "foto_especie_1": "teste",
// "foto_especie_2": "teste",
// "imagem_sem_prop_1": "teste",
// "imagem_sem_prop_2": "teste",
// "imagem_sem_prop_3": "teste",
// "imagem_sem_prop_4": "teste",
// "imagem_sem_prop_5": "teste",
// "imagem_sem_prop_6": "teste",
// "imagem_sem_prop_7": "teste",
// "imagem_sem_prop_8": "teste",
// "imagem_sem_prop_9": "teste",
// "imagem_sem_prop_10": "teste",

//     "fotografo_sem_prop": "teste", // REQ
//     "imagem_sem_prop_1": "teste" // REQ

//     "par_joindate": "teste",
//     "par_code": "teste",
// }
