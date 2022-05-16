import {generate} from "@boilerplate/changelog";
import * as fs from "fs";

console.log('Generating changelog...');

(async () => {
  console.log('Generating changelog...');
  fs.writeFileSync('test.test', 'test');
  await generate();
})();
