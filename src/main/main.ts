import { NodeIO } from '@gltf-transform/core';

const io = new NodeIO();

async function countMaterials(filePath: string): Promise<void> {
    try {
        const document = await io.read(filePath);

        const materials = document.getRoot().listMaterials();

        console.log(`The number of materials: ${materials.length}`);
    } catch (err) {
        console.error(err);
    }
}

const filePath = process.argv[2]; // ファイルパスをコマンドライン引数から取得

countMaterials(filePath);
