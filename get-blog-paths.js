// NOTES : a function to get all blog post path

const fs = require('fs');
const path = require('path');

function getAllFiles(dir, fileArray = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileArray);
    } else {
      fileArray.push(filePath);
    }
  });

  return fileArray;
}

function filterFilesByExtensions(files, extensions) {
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return extensions.includes(ext);
  });
}

const projectDir = 'blog';
const fileExtensions = ['.md'];

const allFiles = getAllFiles(projectDir);

const filteredFiles = filterFilesByExtensions(allFiles, fileExtensions);

filteredFiles.forEach(file =>  {
    // https://cazamate.com
    const p = '/blog/' + path.relative(projectDir, file).slice(0, -3)
    console.log(p)
});
