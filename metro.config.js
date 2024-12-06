// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push(
  "obj",
  "mtl",
  "JPG",
  "vrx",
  "hdr",
  "gltf",
  "glb",
  "bin",
  "arobject",
  "gif",
  "bin"
);
module.exports = config;
