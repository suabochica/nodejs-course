import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// 1. Retrieve the folder to list

const dir = process.argv[2] ?? '../../';

// 2. Simple sizes format 

const formatBytes = (size) => {
  if (size < 1024) return `${size} B`;

  return `${(size / 1024).toFixed(2)} KB`;
}

// 3. Read the filenames without info

const files = await readdir(dir);

// 4. Retrieve file info

const entries = await Promise.all(
  files.map(async (name) => {
    const fullPath = join(dir, name)
    const info = await stat(fullPath)

    return {
      name,
      isDir: info.isDirectory(),
      size: formatBytes(info.size)
    }
  })
);

for (const entry of entries) {
  const icon = entry.isDir ? '📁' : '📄';
  const size = entry.isDir ? '-': `${entry.size}`;

  console.log(`${icon} ${entry.name.padEnd(24)}    ${size}`)
}

