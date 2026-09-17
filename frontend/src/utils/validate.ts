export const isEmailValid = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
};

export const isPasswordValid = (password: string) => {
  const passwordRegex = /^.{6,}$/;

  return passwordRegex.test(password);
};

export const isPhoneValid = (phonenumber: string) => {
  const phoneRegex = /^[6-9]\d{9}$/;

  return phoneRegex.test(phonenumber);
};

export const isUserNameValid = (username: string) => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

  return usernameRegex.test(username);
};
