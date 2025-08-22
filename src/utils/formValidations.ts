export const validateEmail = (email: string) => {
  const trimmedEmail = email.trim()
  if (!trimmedEmail) return []
  const errors = []
  if (!/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(trimmedEmail)) {
    errors.push('Not a valid email format')
  }
  return errors
}

export const validatePassword = (password: string) => {
  const errors = []

  if (!password) {
    errors.push('Password cannot be empty')
    return errors
  }

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one digit')
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return errors
}
