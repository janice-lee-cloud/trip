/** Local images in public/images — work on localhost and GitHub Pages (/trip/). */
export function tripImage(filename) {
  const base = import.meta.env.BASE_URL ?? "/";
  return `${base}images/${filename}`;
}
