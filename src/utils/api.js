const API = 'http://api-gallery.ru/'

function checkReponse(res) {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export async function uploadImage(formData) {
  const res = await fetch(API, {
    method: 'POST',
    body: formData,
  })
  return checkReponse(res)
}

export async function getImages() {
  const res = await fetch(API)
  return checkReponse(res)

}