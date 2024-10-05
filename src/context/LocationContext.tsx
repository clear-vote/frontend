import { createContext, useContext, useState } from "react";

// LocationContext.tsx
interface LocationContextProps {
  precinct: number | undefined;
  coordinates: [number, number][][];
  setPrecinct: React.Dispatch<React.SetStateAction<number | undefined>>;
  setCoordinates: React.Dispatch<React.SetStateAction<[number, number][][]>>;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [precinct, setPrecinct] = useState<number>();
  const [coordinates, setCoordinates] = useState<[number, number][][]>([]);

  return (
    <LocationContext.Provider
      value={{
        precinct,
        coordinates,
        setPrecinct,
        setCoordinates,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};

