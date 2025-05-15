const convertUint8ArrayToBase64 = (bytes: Uint8Array) => {
    if (!bytes) return "";
    const binary = Array.from(bytes)
      .map((b) => String.fromCharCode(b))
      .join("");
    return `data:image/png;base64,${btoa(binary)}`;
  };
export default convertUint8ArrayToBase64  