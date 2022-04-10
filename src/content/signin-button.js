module.exports = {
  page: async (req, res, pageDoc) => {
    if (req.urlPath !== '/account/signin') {
      return
    }
    const link = pageDoc.createElement('a')
    link.attr = {
      style: 'background-image: url(/public/oauth/001-github-sign-white.png)',
      href: '/auth/github-redirect',
      class: 'button'
    }
    link.child = [{
      node: 'text',
      text: 'Sign in with GitHub'
    }]
    const buttonContainer = pageDoc.getElementById('oauth-buttons')
    buttonContainer.appendChild(link)
  }
}
