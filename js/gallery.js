export default class Gallery {
    #miniGalleryHolder
    #bigPhotoHolder
    #prefix
    #count
    #path
    #currentPhoto
    constructor(prefix, count, path, miniGallery, mainPhoto) {
        this.#prefix = prefix
        this.#count = count
        this.#miniGalleryHolder = miniGallery
        this.#bigPhotoHolder = mainPhoto
        this.#path = path
        this.createMiniImages()
    }
    createMiniImages() {
        for (let i = 1; i <= this.#count; i++) {
            let newImg = document.createElement('div')
            newImg.id = `mini-image-${i}`
            newImg.classList.add('mini-image')
            console.log(`${this.#path}${this.#prefix}${i}.jpg`)
            newImg.style.backgroundImage = `url(${this.#path}${this.#prefix}${i}.jpg)`
            newImg.style.backgroundSize = 'cover'
            this.#miniGalleryHolder.append(newImg)
        }
    }
    setMainImage(elementId) {
        const allMiniImages = document.querySelectorAll('.mini-image')
        allMiniImages.forEach(miniImage => {
            miniImage.classList.remove('selected')
        })
        let element = document.getElementById(elementId)
        console.log(`url(${this.#path}${this.#prefix}${element.id.replace('mini-image-', '')}.jpg)`)
        this.#bigPhotoHolder.style.backgroundImage = `url(${this.#path}${this.#prefix}${element.id.replace('mini-image-', '')}.jpg)`
        element.classList.add('selected')
        this.#currentPhoto = element
    }

}