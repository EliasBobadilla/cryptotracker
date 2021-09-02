class Http {
  static instance = new Http()

  get = async url => {
    try {
      const request = await fetch(url)
      const json = await request.json()
      return json
    } catch (error) {
      console.log(`Http GET method error ${error.message}`)
      throw new Error(error)
    }
  }

  post = async (url, body) => {
    try {
      const request = await fetch(url, {
        method: 'POST',
        body,
      })
      const json = await request.json()
      return json
    } catch (error) {
      console.log(`Http POST method error ${error.message}`)
      throw new Error(error)
    }
  }
}

export default Http
