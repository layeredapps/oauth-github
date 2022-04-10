module.exports = {
  page: async (req, res, pageDoc) => {
    if (req.urlPath !== '/account/register') {
      return
    }
    const buttons = document.getElementById('oauth-buttons')
    const icon = document.createElement('img')
    icon.attr = {
      src: '/public/oauth/001-github-sign-white.png'
    }
    const link = document.createElement('a')
    link.attr = {
      href: '/auth/github-redirect'
    }
    link.child = [
      icon,
      {
        node: 'text',
        text: 'Register with GitHub'
      }
    ]
  }
}