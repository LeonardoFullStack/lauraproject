const cloudinary = require("cloudinary").v2
const deleteFile = (url) => {
    //https://res.cloudinary.com/...../usersDayana/rsfsfsfsfs.jpg
    const imgSplit = url.split("/");
    const nameImg = imgSplit[imgSplit.length - 1]// rsfsfsfsfs.jpg
    const nameImgSplit = nameImg.split(".")     // [rsfsfsfsfs,jpg]
    const folder = imgSplit[imgSplit.length - 2] //usersDayana

    const imgToDelete = `${folder}/${nameImgSplit[0]}`
    cloudinary.uploader.destroy(imgToDelete, () => {
        console.log("imagen eliminada")
    })


}

module.exports = { deleteFile }