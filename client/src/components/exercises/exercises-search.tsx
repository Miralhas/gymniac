'use client'

import { nuqsExerciseParams } from "@/lib/schemas/params/exercise-params-schema";
import { SearchIcon, XIcon } from "lucide-react";
import { useQueryStates } from "nuqs";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "../ui/input-group";
import { ChangeEvent, useState } from "react";
import { useDebouncedCallback } from 'use-debounce';

const ExercisesSearch = () => {
  const [params, setParams] = useQueryStates(nuqsExerciseParams);
  const [text, setText] = useState(params.q);

  const handleSearch = useDebouncedCallback((val: string) => {
    const q = val.toLowerCase().trim();
    if (q) {
      setParams({ q, page: null });
    } else {
      setParams({ q: null, page: null });
    }
  }, 300);

  const handleType = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
    handleSearch(event.target.value)
  }

  const handleClear = () => {
    setParams({ q: null, page: null });
    setText("");
  }

  return (
    <div className="">
      <InputGroup>
        <InputGroupInput
          value={text}
          placeholder="Search..."
          onChange={handleType}
        />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        {params.q && (
          <InputGroupAddon className="absolute right-0">
            <InputGroupButton variant="pure" size="sm" onClick={handleClear}>
              <XIcon />
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  )
}

export default ExercisesSearch;
