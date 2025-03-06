module.exports = {
  presets: ['module:@react-native/babel-preset', "nativewind/babel"],

  plugins: [["module-resolver", {
    root: ["./"],
    extensions: [".js", ".ts", ".tsx", ".jsx"],
    plugins: ['module:react-native-dotenv'],

    alias: {
      "@": "./",
      "tailwind.config": "./tailwind.config.js"
    }
  }]]
};
