import { Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class RedcapService {
    private readonly apiUrl = "https://redcap.prpi.ufg.br/api/";
    private readonly apiKey = "F5CE8BF137826E42A317CC63465FA26B";

    async fetchProjectInfo(): Promise<any> {
        try {
            const response = await axios.post(this.apiUrl, {
                token: this.apiKey,
                content: "project",
                format: "json",
                returnFormat: "json",
            });

            console.log("response", response);
            return response.data;
        } catch (error) {
            console.error("Error fetching project information:", error);
        }
    }
}
