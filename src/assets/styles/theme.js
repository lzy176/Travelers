import { themes } from './model';


const changeStyle = (object) => {
  for (const key in object) {
    document.getElementsByTagName('body')[0].style.setProperty(`--${key}`, `${object[key]}`);
  }
};


export const setTheme = (themeName) => {
  const theme = themes[themeName];
  theme && changeStyle(theme);
}