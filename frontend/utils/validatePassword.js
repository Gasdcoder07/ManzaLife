const validatePassword = (pass) => {
  const minLength = (pass.length >= 8)
  const hasUpper = /[A-Z]/.test(pass)
  const hasNumber = /[0-9]/.test(pass)
  const hasSymbol = /[^A-Za-z0-9]/.test(pass)
  return minLength && hasUpper && hasNumber && hasSymbol
}

export default validatePassword
