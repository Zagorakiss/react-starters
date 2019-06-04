export class ImageCacher {

    constructor() {
        this.images = {};
        this.promises = [];
        this.loaded = false;
    }

    loadSingleImage(name, src) {
        this.promises.push(new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            try {
                img.onload = () => {
                    this.images[name] = img;
                    resolve({
                        name: img
                    });
                }
            } catch (err) {
                reject(err);
            }
        }));
    }

    loadImages(dict) {
        Object.keys(dict).forEach((key) => {
            this.loadSingleImage(key, dict[key]);
        });
    }

    onLoad(callback) {
        Promise.all(this.promises).then(() => {
            this.loaded = true;
            callback();
        });
    }

    getImages() {
        if (this.loaded) {
            return this.images;
        }
        this.throwWarn();
    }

    getImageByName(name) {
        if (this.loaded) {
            return this.images[name];
        }
        this.throwWarn();
    }

    throwWarn() {
        throw console.warn('Wait until all the images are loaded');
    }

}