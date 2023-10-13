import path from 'path';
import ts from 'rollup-plugin-typescript2';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
export default {
  input: './src/index.ts',
  output: {
    file: path.resolve(__dirname, './lib/index.js'),
    format: "umd"
  }
}

plugins: [
  ts()
]

// {
//   tsconfig: './tsconfig.json', // 你的 TypeScript 配置文件
//   transpileOnly: true,
//   rollupCommonJS: true,
// }