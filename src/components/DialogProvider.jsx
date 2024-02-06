import React, {createContext, useState} from 'react';

export const DialogContext = createContext();

const DialogProvider = ({children}) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	return (
		<DialogContext.Provider
			value={{
				isDialogOpen,
				setIsDialogOpen,
			}}
		>
			{children}
		</DialogContext.Provider>
	);
};

export default DialogProvider;
