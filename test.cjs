const path = require("path");
const fs = require("fs");

function getComponentEntries() {
  const componentsDir = path.resolve(__dirname, "src/components");
  const entries = {};

  // 遍历组件目录，获取每个组件的入口文件
  const componentDirs = fs.readdirSync(componentsDir);
  for (const dir of componentDirs) {
    console.log(dir);
    const entryName = dir; // 这里假设组件目录的名称就是入口名称
    const entryPath = path.join(componentsDir, dir, "index.tsx");
    entries[entryName] = entryPath;
  }

  return entries;
}

const entriess = getComponentEntries();
console.log("⭐  entriess:", entriess);
