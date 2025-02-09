export interface ToggleStyle {
    backgroundColor: string;
    textColor: string; 
    iconColor: string; 
    iconHover: {
        backgroundColor: string; 
    };
}

export const getToggleStyle = (darkMode: boolean): ToggleStyle => ({
    backgroundColor: darkMode ? "var(--white-color)" : "var(--orange-color)",
    textColor: darkMode ? 'var(--orange-color)' : 'var(--black-color)', 
    iconColor: darkMode ? 'var(--orange-color)' : 'var(--black-color)', 
    iconHover: {
        backgroundColor: darkMode ? 'var(--white-color)' : 'var(--orange-color)', 
    },
});
