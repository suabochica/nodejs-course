const libName =
  Deno.build.os === 'windows'
    ? './lib.dll'
    : Deno.build.os === 'darwin'
      ? './lib.dylib'
      : './lib.so'

const lib = Deno.dlopen(libName, {
  toUpperCase: {
    parameters: ['pointer'],
    result: 'void',
  },
})

function toCString(str: string): Uint8Array {
  const encoder = new TextEncoder()
  const encoded = encoder.encode(str + '\0')
  // Create a new ArrayBuffer-backed Uint8Array for FFI
  const buffer = new Uint8Array(new ArrayBuffer(encoded.length))
  buffer.set(encoded)
  return buffer
}

export function toUpperCaseWithC(str: string): string {
  const buffer = toCString(str)
  const ptr = Deno.UnsafePointer.of(buffer.buffer as ArrayBuffer)
  lib.symbols.toUpperCase(ptr)

  // Decode and return the modified string
  const decoder = new TextDecoder()
  return decoder.decode(buffer)
}
