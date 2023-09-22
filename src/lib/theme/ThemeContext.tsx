import React from "react";

interface IThemeContext {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const ThemeContext = React.createContext<IThemeContext>({
    theme: 'light',
    toggleTheme: () => {
    }
});
