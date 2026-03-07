import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class StorageHandler {

    public getImageUrl(folder: string, fileName: string): string | null {

        if (!fs.existsSync(folder)) {
            return null;
        }

        const files = fs.readdirSync(folder);

        const file = files.find(f => f.startsWith(fileName));

        if (!file) {
            return null;
        }

        return `${process.env.BASE_URL}/${folder.replace('./', '')}/${file}`;
    }

}
