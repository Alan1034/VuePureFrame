/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2023-08-07 19:12:51
 * @LastEditTime: 2023-11-06 14:33:54
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 自动更新package.json里的version版本号
 * @FilePath: \VuePureFrame\vitePlugin.ts
 * 
 */
import path from "path";
import vizion from 'vizion'
import fs from 'fs'
import chalk from 'chalk'

export function updateVersion() {
  return {
    name: 'update-version', // 必须的，将会在 warning 和 error 中显示
    buildStart: async (options: any) => {
      // console.info(options)
      // const Timestamp = new Date().getTime()
      let gitRevision = {
        revision:"",
        branch:""
      }
      //使用git信息
      try {
        gitRevision = await new Promise<any>((resolve, reject) => {
          vizion.analyze({
            folder: path.join(__dirname, '/')
          }, function (err: any, meta: any) {
            if (err) {
              reject(err)
              return
            }
            resolve(meta)
          });
        })
      } catch (error) {
        console.log(chalk.yellowBright.bold('还没有git信息，无法更新version版本号', error));
        return
      }
      // console.log(gitRevision)                   
      //获取commitId
      const commitId = gitRevision.revision
      //获取branch信息
      const branch = gitRevision.branch

      // const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
      //每次打包构建代码，自动更新版本号，同一天加1，隔天自动回归变成 1 。例如{ 今天：1.20200917.3，第二天：1.20200918.1 }
      try {
        const AddZero = (time: any) => {
          if (time < 10) {
            return "0" + time
          } else {
            return time
          }
        }
        //指出我们要将信息写入到哪里
        const packageTxt = fs.readFileSync(path.join(__dirname, './package.json'), 'utf8');
        const versionData = packageTxt.split('\n');
        const packageJson = JSON.parse(packageTxt);
        const VersionArr = packageJson.version.split('.');
        const date = new Date();
        const today = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate())
        if (today == VersionArr[1]) {
          VersionArr[2] = parseInt(VersionArr[2]) + 1
        } else {
          VersionArr[1] = date.getFullYear() + "" + AddZero((date.getMonth() + 1)) + "" + AddZero(date.getDate())
          VersionArr[2] = 1;
        }
        const versionLine = VersionArr.join('.');
        for (let i = 0; i < versionData.length; i++) {
          if (versionData[i].indexOf('"version":') != -1) {
            versionData.splice(i, 1, '  "version": "' + versionLine + '",');
            break;
          }
        }
        for (let i = 0; i < versionData.length; i++) {
          if (versionData[i].indexOf('"buildTime":') != -1) {
            versionData.splice(i, 1, '  "buildTime": "' + date + '",');
            break;
          }
        }
        for (let i = 0; i < versionData.length; i++) {
          if (versionData[i].indexOf('"commitId":') != -1) {
            versionData.splice(i, 1, '  "commitId": "' + commitId + '",');
            break;
          }
        }
        for (let i = 0; i < versionData.length; i++) {
          if (versionData[i].indexOf('"branch":') != -1) {
            versionData.splice(i, 1, '  "branch": "' + branch + '",');
            break;
          }
        }
        // versionData.splice(i,1,'  "buildTime": "'+versionLine+'",');
        fs.writeFileSync(path.join(__dirname, './package.json'), versionData.join('\n'), 'utf8');
        console.log(chalk.green.bold('更新版本号成功！当前最新版本号为：' + versionLine));
      } catch (e: any) {
        console.log(chalk.red.bold('读取文件修改版本号出错:', e.toString()));
      }
      return `export const msg = "from virtual module"`
    },
  }
}