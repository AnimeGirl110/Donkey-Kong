const loaded = {};

export function loadImage(path) {
  return new Promise((resolve, reject) => {
    if (loaded[path]) {
      resolve(loaded[path]);
    } else {
      console.log("Loading image ", path);
      loaded[path] = new Image();
      loaded[path].onload = () => {
        resolve(loaded[path]);
      };
      loaded[path].onerror = (err) => {
        reject(err);
      };
      loaded[path].src = path;
    }
  });
}

export default { loadImage };
