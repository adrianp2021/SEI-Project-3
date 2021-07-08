export const getTokenFromStorage = () => {
  return window.localStorage.getItem('token')
}

export const getPayload = () => {
  const token = getTokenFromStorage()

  if (!token) return
  
  const splitToken = token.split('.')
  // console.log('splitToken >>>', splitToken)

  if (splitToken.length < 3) return
  return JSON.parse(atob(splitToken[1]))
}

export const checkUserIsAuthenticated = () => {

  const payload = getPayload()

  if (!payload) return
  
  const currentTime = Math.round(Date.now() / 1000)
  return currentTime < payload.exp

}