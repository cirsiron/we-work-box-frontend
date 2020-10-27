export const storage = {
  get (name) {
    const data = localStorage.getItem(name)
    if (data) {
      try {
        return JSON.parse(localStorage.getItem(name))
      } catch (e) {
        return data
      }
    }
    return null
  },
  set (name, data) {
    if (!name) {
      return
    }
    localStorage.setItem(name, JSON.stringify(data))
  },
  remove (name) {
    if (!name) {
      return
    }
    localStorage.removeItem(name)
  }
}
