export const storage = {
  get (name) {
    const data = localStorage.getItem(name)
    if (data) {
      return JSON.parse(localStorage.getItem(name))
    }
    return null
  },
  set (name, data) {
    if (!name) {
      return
    }
    localStorage.setItem(name, JSON.stringify(data))
  }
}
