/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-05-09 17:44:24
 * @LastEditTime: 2023-11-15 09:30:17
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: OpenAPI格式(Swagger)文件转化为TS接口文件
 * @FilePath: \VuePureFrame\scripts\syncApi.ts
 * 
 */
import { execSync } from "node:child_process";
import path from "node:path";
import { formatFile } from "./lib/format";
import chalk from 'chalk'

const apiDir = path.resolve(__dirname, "../src/api");
const apiAutoFileName = "api.auto.ts";
const apiAutoFilePath = path.resolve(apiDir, apiAutoFileName);


async function downloadAndGenerateApi(FilePath:string) {
  const swaggerFilePath = path.resolve(apiDir, FilePath);
  try{
    await formatFile(swaggerFilePath, "json");
    // bass on swagger-typescript-api
    execSync(`sta -p ${swaggerFilePath} -o ${apiDir} -n ${apiAutoFileName} --module-name-index 1 -r`);
    formatFile(apiAutoFilePath, "typescript");
    console.log(chalk.green.bold(`Successfully create ${apiAutoFilePath}`));
  }catch (e: any) {
    console.log(chalk.red.bold('文件转化出错:', e.toString()));
  }

}

downloadAndGenerateApi("example.openapi.json");
