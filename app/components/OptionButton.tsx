import { Category, Difficulty, Type } from '@/utils/options';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import React, { useState } from 'react';

interface OptionButtonProps {
  selectOption: (option: Category | Difficulty | Type) => void;
  options: string[];
}

const OptionButton = ({ selectOption, options }: OptionButtonProps) => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([options[0]]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(', ').replaceAll('_', ' '),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="shadow"
          className="capitalize bg-[rgba(255,255,255,0.62)] "
        >
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Option Selection"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {Object.values(options).map((option) => (
          <DropdownItem
            key={option}
            onClick={() => {
              selectOption(option as Category | Difficulty | Type);
            }}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
export default OptionButton;
