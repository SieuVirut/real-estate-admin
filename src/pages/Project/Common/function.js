import { isArray } from "util";

export function getNewImagePath(images) {
  let newImagePath = []
  if (!images && images.length < 1) return []
  images.forEach(e => {
    if (e.status == 'done' && e.note == 'newFile') {
      newImagePath.push(e.urlFromServer)
    }
  })
  return newImagePath
}

export function getListDeleteImageId(listOldImages, listNewImages) {
  if (!isArray(listOldImages) || !isArray(listNewImages)) return []
  let oldId = []
  let newId = []
  
  listOldImages.forEach(image => {
    oldId.push(image.id)
  })

  listNewImages.forEach(image => {
    if (image.note == 'oldFile') {
      newId.push(image.uid)
    }
  })


  let listDeleteId = []
  oldId.forEach(id => {
    if (!newId.includes(id)) {
      listDeleteId.push(id)
    }
  })
  return listDeleteId || []

}