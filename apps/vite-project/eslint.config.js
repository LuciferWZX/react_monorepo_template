import tseslint from "typescript-eslint";
import rootTsEslintConfig from "../../eslint.config.js";
export default tseslint.config({
  extends: rootTsEslintConfig,
  rules: {},
});
