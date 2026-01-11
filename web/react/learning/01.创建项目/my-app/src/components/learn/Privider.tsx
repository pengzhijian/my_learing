import React, { createContext, useState } from'react';

// 创建上下文对象
const ThemeContext = createContext(null);

// 模拟ThemeProvider
const MyThemeProvider: React.FC<{ theme: object, children: React.ReactNode }> = ({ theme, children }) => { 
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

// 模拟使用主题的组件
const ThemeConsumerComponent: React.FC = () => {
  const theme = React.useContext(ThemeContext);
  return (
    <div>
      {JSON.stringify(theme)}
    </div>
  );
};

const Provider: React.FC = () => {
  const theme = { color: 'blue' };
  return (
    <MyThemeProvider theme={theme}>
      <ThemeConsumerComponent />
    </MyThemeProvider>
  );
};

export { Provider };