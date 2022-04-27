const fs = require('fs')
const dashboard = require('../../../dashboard')
const errorTemplates = fs.readFileSync('./signin-error-templates.html')
const errorHTML = dashboard.HTML.parse(errorTemplates)

module.exports = {
  page: signinErrorTemplates
}

async function signinErrorTemplates (req, _, pageDoc) {
  if (req.urlPath !== '/account/signin') {
    return
  }
  if (!req.query || !req.query.error) {
    return
  }
  const body = pageDoc.getElementsByTagName('body')[0]
  const errorBody = errorHTML.getElementsByTagName('body')[0]
  body.child = body.child.concat(errorBody.child)
}
