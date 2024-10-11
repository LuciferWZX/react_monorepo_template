import tSEslint from "typescript-eslint";
import rootTsEslintConfig from "../../eslint.config.js";
export default tSEslint.config({
  extends: rootTsEslintConfig,
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
  },
});
