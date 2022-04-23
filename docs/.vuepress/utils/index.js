export const fetch = (url, config) => {
  return window.fetch(url, config)
    .then(res => res.json())
    .then(res => {
      if (typeof res.data === "string") {
        return JSON.parse(res.data)
      }
      return res.data
    })
}

export const fetchWithLeetCodeToken = (url) => {
  return fetch(url, {
    headers: {
      'Access-Token': "day5"
    }
  })
}