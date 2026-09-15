export function signedStorageUrl(projectUrl: string, signedPath: string): URL {
  const project = new URL(projectUrl);
  let url: URL;
  if (signedPath.startsWith("/object/")) url = new URL(`/storage/v1${signedPath}`, project.origin);
  else if (signedPath.startsWith("object/")) url = new URL(`/storage/v1/${signedPath}`, project.origin);
  else url = new URL(signedPath, project.origin);
  if (url.origin !== project.origin || !url.pathname.startsWith("/storage/v1/object/sign/product-media/")) {
    throw new Error("Invalid storage response");
  }
  return url;
}
