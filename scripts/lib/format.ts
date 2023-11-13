/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-11-13 15:04:25
 * @LastEditTime: 2023-11-13 15:42:34
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \deal-front-end\scripts\lib\format.ts
 * 
 */
import prettier from "prettier";
import path from "path";
import { readFileSync, writeFileSync } from "node:fs";

export const prettierConfig =async()=>{
return await  prettier.resolveConfig(
  path.resolve(__dirname, "../../.prettierrc")
)
};

export async function formatFile(filePath: string, parser: "typescript" | "json") {
  // console.log(filePath)
  const content = readFileSync(filePath, "utf-8");
  const formattedContent =await prettier.format(content, {
    ...prettierConfig,
    parser,
  });
  // console.log(formattedContent)
  writeFileSync(filePath, formattedContent);
}
