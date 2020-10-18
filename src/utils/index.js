import { URL_API, STRINGIFY_URL_OPTIONS } from "../constants"
import { stringifyUrl } from 'query-string'
import { saveAs } from 'file-saver'

export async function post (url, query, data) {
  const fullUrl = await stringifyUrl({ url: `${URL_API + url}`, query }, STRINGIFY_URL_OPTIONS)

  return await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

export async function download (url, query, data) {
  const fullUrl = await stringifyUrl({ url: `${URL_API + url}`, query }, STRINGIFY_URL_OPTIONS)
  const fileName = data.fileName

  let formData = {}
  await Object.keys(data).map(v => {
    if (v !== 'fileName') formData[v] = data[v]

    return v
  })

  return await fetch(fullUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  }).then(_ => _.ok ? _.blob() : null)
    .then(blob => blob ? saveAs(blob, `${fileName}.png`) : null)
}