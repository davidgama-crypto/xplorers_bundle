const infoKey = 'playerInfo';
const tokenKey = 'token';

export default class PlayerCache {
  static cachePlayerInfo(playerInfo) {
    console.debug('Caching player info...');
    const { token } = playerInfo;
    const info = JSON.stringify(playerInfo);
    localStorage.setItem(infoKey, info);
    localStorage.setItem(tokenKey, token);
  }

  static cachedInfoExists() {
    const infoExists = localStorage.getItem(infoKey);
    return infoExists !== null;
  }

  static playerTokenExists() {
    const tokenExists = localStorage.getItem(tokenKey);
    return tokenExists !== null;
  }

  static getPlayerInfo() {
    const info = localStorage.getItem(infoKey);
    console.debug('getting player info');
    console.debug(info);
    if (info) return JSON.parse(info);
    throw new Error('No cached playerInfo exists');
  }

  static getPlayerToken() {
    console.debug('getting player info');

    const token = localStorage.getItem(tokenKey);
    if (token) return token;
    throw new Error('No player token exists');
  }

  static clearPlayerToken() {
    localStorage.removeItem(tokenKey);
  }

  static clearPlayerInfo() {
    localStorage.removeItem(infoKey);
  }

  static clearAll() {
    PlayerCache.clearPlayerInfo();
    PlayerCache.clearPlayerToken();
  }
}
