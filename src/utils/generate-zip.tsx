import { Modules } from "./tree";
import JSZip from "jszip";
import { dump } from "js-yaml";
import { saveAs } from "file-saver";

export const generateZip = (modules: Modules) => {
  const zip = new JSZip();

  // 生成 order.yaml
  const imports: string[] = [];
  for (const mo of modules) {
    imports.push(mo.path);
  }
  zip.file("order.yaml", dump({ imports: imports }));

  for (const mo of modules) {
    // 开始构造模块
    const modroot = zip.folder(mo.path);
    const tmpModule: { id: string; styles: string[]; contents: string[] } = {
      id: mo.id,
      styles: [],
      contents: [],
    };
    for (const sty of mo.styles) {
      tmpModule.styles.push(sty.path);
    }
    for (const cont of mo.contents) {
      tmpModule.contents.push(cont.path);
    }
    // 生成模块标识文件
    modroot?.file("module.yaml", dump(tmpModule));

    // 生成 style 文件
    for (const style of mo.styles) {
      modroot?.file(style.path, dump({ styles: style.styles }));
    }

    //生成content文件
    for (const content of mo.contents) {
      modroot?.file(
        content.path,
        dump({
          id: content.id,
          files: content.files.map((file) => file.path),
          styles: content.styles,
        })
      );
      for (const file of content.files) {
        modroot?.file(file.path, file.content);
      }
    }
  }

  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, "my-doc.zip");
  });
};
