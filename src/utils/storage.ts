export const ss = {
  setItem(key: string, value: any) {
    const d = JSON.stringify(value)
    sessionStorage.setItem(key, d)
    return d
  },
  getItem(key: string) {
    const d = sessionStorage.getItem(key)
    if (d) {
      try {
        return JSON.parse(d)
      } catch (error) {
        return ''
      }
    }
    return ''
  },
  removeItem(key: string) {
    sessionStorage.removeItem(key)
  },
}
export const ls = {
  setItem(key: string, value: any) {
    const d = JSON.stringify(value)
    localStorage.setItem(key, d)
    return d
  },
  getItem(key: string) {
    const d = localStorage.getItem(key)
    if (d) {
      try {
        return JSON.parse(d)
      } catch (error) {
        return ''
      }
    }
    return ''
  },
  removeItem(key: string) {
    localStorage.removeItem(key)
  },
}
