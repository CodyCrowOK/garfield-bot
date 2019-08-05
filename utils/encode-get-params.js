function encodeGetParams (argumentsAsObject) {
  return Object.entries(argumentsAsObject)
    .map(
      kv => kv.map(encodeURIComponent)
        .join("=")
    )
    .join("&");
}

module.exports = encodeGetParams;
