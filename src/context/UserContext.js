import React, { Children, createContext, useState } from 'react';

export const UserContext = createContext();
export const UserProvider = (props) => {
  const [userData, setUserData] = useState({
    user: undefined,
    token: undefined,
  });

  return (
    <UserContext.Provider value={[userData, setUserData]} >
      {Children.only(props.children)}
    </UserContext.Provider>
  );
};
