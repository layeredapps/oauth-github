const querystring = require('querystring')

module.exports = {
  auth: false,
  get: async (req, res) => {
    const clientid = process.env.GITHUB_OAUTH_CLIENTID
    const redirectURL = 'https://github.com/login/oauth/authorize'
    const params = {
      client_id: clientid,
      redirect_uri: `${global.dashboardServer}/auth/github-callback`,
      response_type: 'code',
      scope: 'profile email openid'
    }
    res.writeHead(301, {
      Location: `${redirectURL}?${querystring.stringify(params)}`
    })
    return res.end()
  }
}
