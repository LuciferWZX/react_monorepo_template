import tSEslint from "typescript-eslint";
import rootTsEslintConfig from "../../eslint.config.js";
export default tSEslint.config({
  extends: rootTsEslintConfig,
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
  },
});
