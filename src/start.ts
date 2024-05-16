import { GiteeRelease, ReleaseTypes } from "./interfaces/gitee"
import { writeFileSync } from 'fs'
import fs from "fs";

async function start() {
    const panels = [
        { name: 'survivalcraft-api', path: 'zaihuishouzh/survivalcraft-api' }
    ]
    await fs.promises.mkdir("./version", { recursive: true })
    for (const { name, path } of panels) {
        const response = await fetch(`https://gitee.com/api/v5/repos/${path}/releases`)
        const data = await response.json() as GiteeRelease
        const result: ReleaseTypes[] = [];
        if (!response.ok) {
            console.log('An error occurred when trying to make a request to the Gitee API...')
            continue
        }
        const releases: GiteeRelease[] = await response.json()
        for (const release of releases) {
            if (!release?.assets) continue;
            result.push({ ident: String(release.id), name: release.tag_name, link: getDownloadLink(release), cors: true })
        }
        const json = JSON.stringify({
            data: data,
            versions: "data",
            lastSynced: new Date().toLocaleTimeString()
        }, null, 2)

        writeFileSync(`version/${name}.json`, json)
    }
}

void start()

function getDownloadLink(release: GiteeRelease): string {
    let result = "";
    for (const asset of release.assets) {
        const includes = [".exe.7z", ".7z", "Win64.7z", ".7z"]
        for (const extension of includes) {
            if (asset.name.endsWith(extension)) {
                result = asset.browser_download_url;
                break;
            }
        }
        if (result) {
            break;
        }
    }
    return result;
}