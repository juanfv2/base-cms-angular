/* -------------------------------------------------------------------------- */
/* npm i -g replace-in-file                                                   */
/* -------------------------------------------------------------------------- */

const regex = new RegExp('d-([0-9]*-[0-9]*)', 'm')
const now = new Date()

module.exports = {
  files: './src/index.html',
  from: regex,
  to:
    'd-' +
    now.getFullYear() +
    '' +
    now.getMonth() +
    '' +
    now.getDate() +
    '-' +
    now.getHours() +
    '' +
    now.getMinutes() +
    '' +
    now.getSeconds(),
}
