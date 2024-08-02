// @ts-check
/* eslint-disable prefer-rest-params */

const { log, HELPERS } = require('@rm/logger')

/** @type {import('@rm/types').ExpressErrorMiddleware} */
function errorMiddleware(err, req, res, next) {
  log.error(
    HELPERS.express,
    HELPERS.custom(req.originalUrl, '#00d7ac'),
    req.user ? `- ${req.user.username}` : 'Not Logged In',
    '|',
    req.headers['x-forwarded-for'],
    '|',
    err,
  )

  switch (err.message) {
    case 'NoCodeProvided':
      return res.redirect('/404')
    case "Failed to fetch user's guilds":
      return res.redirect('/login')
    default:
      next(err)
  }
}

module.exports = { errorMiddleware }
