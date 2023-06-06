import Themes from "../styles/themes";

const setCSSVariables = theme => {
    for (const value in theme) {
      document.documentElement.style.setProperty(`--${value}`, theme[value]);
    }
  };

export default function useTheme(value="default") {
    if (Themes.hasOwnProperty(value)) {
        const theme = Themes[value];
        setCSSVariables(theme);
    }
}