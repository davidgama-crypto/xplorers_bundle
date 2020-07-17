
const keyName = 'playerInfo'

export default class PlayerCache {
  static cachePlayerInfo(playerInfo) {
    const info = JSON.stringify(playerInfo)
    localStorage.setItem(keyName, info)

  }

  static cachedInfoExists() {
    const exists = localStorage.getItem(keyName)
    return exists !== null

  }

  static getPlayerInfo() {
    const info = localStorage.getItem(keyName)
    if (info !== null) return JSON.parse(info)
    throw new Error(`No cached playerInfo exists`)
  }


}