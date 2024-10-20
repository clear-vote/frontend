import * as React from "react"
import { cn } from "@/lib/utils";
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@/components/ui/button';


interface MapboxSearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  token: string | undefined;
  bounds: string; // Assuming bounds is an array of numbers [westLng, southLat, eastLng, northLat]
  maxResults: number;
}

interface SearchResult {
  place_name: string;
  center: [number, number]; // Assuming center is an array of [longitude, latitude]
}

/** Just imported the code over from the original front end! Can make changes as needed! */
const MapboxSearchInput = React.forwardRef<HTMLInputElement, MapboxSearchInputProps>(
  ({ className, token, bounds, maxResults, ...props }, ref) => {
    const [searchResults, setSearchResults] = React.useState([]); // search
    const [focusedItemIndex, setFocusedItemIndex] = React.useState(-1); // focused list item
    const [inputValue, setInputValue] = React.useState(''); // input string
    const [selectedItem, setSelectedItem] = React.useState({}); // selected item, which contains the coordinates
    const [shouldSearch, setShouldSearch] = React.useState(true);

    // is handle input change being called when 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFocusedItemIndex(-1);
      setInputValue(event.target.value);
      setShouldSearch(true);
    };

    React.useEffect(() => {
      if (!token) {
        alert("Mapbox token is required!")
      }
      if (inputValue.length > 3 && shouldSearch) {
        const timeoutId = setTimeout(() => {
          const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(inputValue)}.json?access_token=${token}&bbox=${bounds}&fuzzyMatch=true&limit=${maxResults}&routing=false`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
              setSearchResults(data.features); // Assuming you want to store the features array
            })
            .catch(error => {
              console.error('Error fetching search results:', error);
            });
        }, 500); // 500ms delay
        return () => {
          clearTimeout(timeoutId);
        };
      } else {
        setSearchResults([]);
      }
    }, [inputValue, token, bounds, maxResults, shouldSearch]); // Dependency array includes inputValue, so the effect runs when inputValue changes

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setFocusedItemIndex(prevIndex => Math.min(prevIndex + 1, searchResults.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setFocusedItemIndex(prevIndex => Math.max(prevIndex - 1, -1));
      } else if (event.key === "Enter") {
        event.preventDefault();
        handleEnterKey();
      }
    };

    const handleEnterKey = () => {
      if (focusedItemIndex >= 0) { // user hasn't picked an item
        setInputValue((searchResults[focusedItemIndex] as SearchResult).place_name);
        setSelectedItem(searchResults[focusedItemIndex]);
        setSearchResults([]);
        setFocusedItemIndex(-1);
        setShouldSearch(false);
      } else if (!selectedItem && searchResults.length === 0) {
        alert("you must enter an item!");
      } else {
        if (searchResults.length > 0) { // in this case, the user is lazy and didn't pick an item, so we do for them
          setSelectedItem(searchResults[0]);
          // alert("user didn't pick; choosing top search result")
        }
        handleCoordinates(selectedItem);
        setShouldSearch(false);
      }
    }

    const handleCoordinates = (selectedItem: {}) => {
      const center = (selectedItem as SearchResult).center;
      if (center && Array.isArray(center) && center.length === 2) {
        const [lng, lat] = center;
        if (typeof lng === 'number' && typeof lat === 'number' &&
          lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90) {
          // Coordinates are valid, these will get passed up to the query parameter and cause a page reload
          window.location.href = `/decisionFlow?latitude=${lat}&longitude=${lng}`;
        } else {
          alert('Invalid coordinates');
        }
      }
    }

    const handleItemClick = (itemIndex: number) => {
      setSearchResults([]);
      setFocusedItemIndex(-1);
      setInputValue((searchResults[itemIndex] as SearchResult).place_name);
      setSelectedItem(searchResults[itemIndex]);
      setShouldSearch(false);
    };

    return (
      <div className={cn(
          "relative flex flex-col h-auto items-start",
          className,
        )}
      >
        <div className="flex w-full items-center gap-2">
          <div className="flex-1 rounded-md border border-input bg-white pl-3 py-2 px-1 text-md ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2">
            <input
              {...props}
              type="search"
              className="w-full placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              ref={ref}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleEnterKey} variant="brand"><SearchIcon/></Button>
          {/* <button onClick={handleEnterKey} className="rounded-lg h-full w-1/4 bg-[#947fee] hover:bg-[#D3D3D3] ">
          <SearchIcon/></button> */}
          
        </div>
        {searchResults?.length > 0 && (
          <div className="absolute top-full mt-1 w-full z-10 border border-input bg-white rounded-md shadow-lg">
            <ul className="list-none max-h-60 overflow-auto">
              {searchResults.map((result, index) => (
                <li
                  key={index}
                  className={`p-2 hover:bg-gray-100 ${index === focusedItemIndex ? "bg-gray-100" : ""}`}
                  onMouseEnter={() => setFocusedItemIndex(index)}
                  onClick={() => handleItemClick(index)}
                >
                  {(result as SearchResult).place_name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  },
);

MapboxSearchInput.displayName = "Search";

export { MapboxSearchInput };