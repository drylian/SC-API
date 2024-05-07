import { GiteeRelease } from "./interfaces/gitee"
import { writeFileSync } from 'fs'
import fs from "fs";

async function start() {
    const panels = [
        { name: 'survivalcraft-api', path: 'zaihuishouzh/survivalcraft-api' }
    ]
    await fs.promises.mkdir("./version", {recursive:true})
    for (const { name, path } of panels) {
        const response = await fetch(`https://gitee.com/api/v5/repos/${path}/releases`)
        const data = await response.json() as GiteeRelease

        if (!response.ok) {
            console.log('An error occurred when trying to make a request to the Gitee API...')
            continue
        }

        const json = JSON.stringify({
            ...data,
            lastSynced: new Date().toLocaleTimeString()
        }, null, 2)

        writeFileSync(`version/${name}.json`, json)
    }
}

void start()