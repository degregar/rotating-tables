const { program } = require("commander");

import { transform } from "./cli/helpers";

program.argument("<inputPath>", "path to input CSV file").action(transform).parse();
