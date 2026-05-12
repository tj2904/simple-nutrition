import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["coverage/**"],
  },
  ...nextVitals,
];

export default eslintConfig;
