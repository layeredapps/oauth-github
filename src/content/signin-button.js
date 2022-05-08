const errorTemplates = fs.readFileSync('./error-templates.html')
const errorHTML = dashboard.HTML.parse(errorTemplates)
const errorBody = errorHTML.getElementsByTagName('body')[0]

module.exports = {
  page: signinButton
}

async function signinButton (req, _, pageDoc) {
  if (req.urlPath !== '/account/signin') {
    return
  }
  const link = pageDoc.createElement('a')
  link.attr = {
    style: 'background-image: url(/public/oauth/001-github-sign-white.png)',
    href: '/auth/github-redirect',
    class: 'button oauth-button'
  }
  link.child = [{
    node: 'text',
    text: 'Sign in with GitHub'
  }]
  const buttonContainer = pageDoc.getElementById('oauth-buttons')
  buttonContainer.appendChild(link)
  const body = pageDoc.getElementsByTagName('body')[0]
  body.child = body.child.concat(errorBody.child)
}
