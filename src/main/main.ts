import { NodeIO, Logger } from '@gltf-transform/core';
import fs from 'fs';
import path from 'path';

// カスタムロガーを作成します。これは警告を無視し、エラーのみを出力します。
const customLogger = {
    debug: (message?: any, ...optionalParams: any[]): void => {},
    info: (message?: any, ...optionalParams: any[]): void => {},
    warn: (message?: any, ...optionalParams: any[]): void => {},
    error: (message?: any, ...optionalParams: any[]): void => {
        console.error(message, ...optionalParams);
    },
} as Logger;

const io = new NodeIO().setLogger(customLogger);

async function countMaterials(filePath: string): Promise<number> {
    try {
        const document = await io.read(filePath);
        const materials = document.getRoot().listMaterials();
        return materials.length;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function countMaterialsInDirectory(dirPath: string): Promise<void> {
    let totalMaterials = 0;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isFile() && path.extname(filePath) === '.glb') {
            const materialCount = await countMaterials(filePath);
            console.log(`File: ${filePath}, Materials: ${materialCount}`);
            totalMaterials += materialCount;
        }
    }

    console.log(`Total number of materials in directory: ${totalMaterials}`);
}

const dirPath = process.argv[2]; // ディレクトリパスをコマンドライン引数から取得

countMaterialsInDirectory(dirPath);
