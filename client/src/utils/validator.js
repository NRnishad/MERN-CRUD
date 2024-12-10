
export const checkName = (name)=>{
  const hasError = /^[a-zA-Z ]{3,30}$/.test(name);
  return hasError? false: 'Enter a valid name';
}

export const checkEmail = (email)=>{
  const hasError = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/.test(email);
  return hasError? false: 'Enter a valid email'
}

export const checkPassword = (password)=>{
  const hasError = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
  return hasError? false: 'Password must contain upper(1),length(6-16),special char(1)'
}