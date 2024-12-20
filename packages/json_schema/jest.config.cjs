module.exports = {
  preset: "ts-jest",
  // testEnvironment: 'jsdom',
  testMatch: ["**/__tests__/**/*.+(ts|ts|js)"],
  transform: {
    "^.+.(ts|tsx)$": "ts-jest",
  },
  // moduleNameMapper: {
  //     '^.+\.css$': 'identity-obj-proxy',
  // },
};
