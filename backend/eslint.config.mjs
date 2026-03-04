import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: [".*"],
              message:
                "Relative imports are not allowed. Use @/ alias instead.",
            },
          ],
        },
      ],
    },
  },
  {
    ignores: ["node_modules/", "dist/"],
  },
);
