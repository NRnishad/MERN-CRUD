
export const checkName = (name)=>{
  const hasError = /^[a-zA-Z ]{3,30}$/.test(name);
  return hasError? false: 'Enter a valid name';
}

export const checkEmail = (email)=>{
  const hasError = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/.test(email);
  return hasError? false: 'Enter a valid email'
}

export const checkPassword = (password)=>{
  const hasError = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(password);
  return hasError? false: 'Password must Be at least 8 characters longContain at least one letter,Contain at least one number'
}