// Text recognition, rather than full email/URL validation. Share these rules with
// the tagger so hyphens in recognized addresses survive tokenization.
export const email = /^[\w.!#$%&'*+/=?^`{|}~-]+@(?:[\w-]+\.)+[a-z]{2,}$/i
export const explicitUrl = /^(?:https?:(?:\/\/)?|www\.)(?:[a-z0-9-]+\.)+[a-z]{2,}(?::[0-9]+)?(?:[/?#]\S*)?$/i
export const bareUrl = /^(?:[a-z0-9-]+\.)+(?:com|net|gov|org|ly|edu|info|biz|dev|ru|jp|de|in|uk|br|io|ai)(?::[0-9]+)?(?:[/?#]\S*)?$/i

export const isWebToken = function (str) {
  if (!str.includes('.')) {
    return false
  }
  let start = 0
  let end = str.length
  while (start < end && /[\s("'“‘<]/.test(str[start])) start++
  while (end > start && /[\s).,!?:;"'”’>]/.test(str[end - 1])) end--
  const text = str.slice(start, end)
  return email.test(text) || explicitUrl.test(text) || bareUrl.test(text)
}
