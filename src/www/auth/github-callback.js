const dashboard = require('../../../index.js')
const oauth = require('@layeredapps/oauth')

module.exports = {
  auth: false,
  get: async (req, res) => {
    const clientid = process.env.GITHUB_OAUTH_CLIENTID
    const secret = process.env.GITHUB_OAUTH_SECRET
    const params = {
      client_id: clientid,
      client_secret: secret,
      code: req.query.code,
      redirect_uri: `${global.dashboardServer}/auth/oauth-callback`,
    }
    const tokenRaw = await dashboard.Proxy.externalPOST(`https://github.com/login/oauth/access_token`, {}, params)
    let token = tokenRaw.substring(tokenRaw.indexOf('=') + 1)
    token = token.substring(0, token.indexOf('&'))
    // get their Github profile
    const profileRaw = await dashboard.Proxy.externalGET('https://api.github.com/user', {
      Authorization: `token ${token}`,
      'User-Agent': '@layeredapps/dashboard'
    })
    const profile = JSON.parse(profileRaw)
    // register or signin
    const user = await oauth.registerOrSignIn(profile.login, 'github')
    // session cookie
    let cookieStr = 'HttpOnly; path=/; SameSite=strict'
    if (req.secure) {
      cookieStr += '; secure'
    }
    if (global.domain && global.domain !== 'localhost') {
      const domainColon = global.domain.indexOf(':')
      if (domainColon > -1) {
        cookieStr += '; domain=' + global.domain.substring(0, domainColon)
        cookieStr += '; port=' + global.domain.substring(domainColon + 1)
      } else {
        cookieStr += '; domain=' + global.domain
      }
    } else {
      const address = global.dashboardServer.split('://')[1]
      const addressColon = address.indexOf(':')
      if (addressColon > -1) {
        cookieStr += '; domain=' + address.substring(0, addressColon)
        cookieStr += '; port=' + address.substring(addressColon + 1)
      } else {
        cookieStr += '; domain=' + address
      }
    }
    res.setHeader('set-cookie', [
      `sessionid=${user.session.sessionid}; ${cookieStr}`,
      `token=${user.session.token}; ${cookieStr}`
    ])
    // profile completion
    if (global.requireProfile && !user.account.profileid) {
      return dashboard.Response.redirect(req, res, '/account/complete-profile')
    }
    // sign in to home
    return dashboard.Response.redirect(req, res, '/home')
  }
}
