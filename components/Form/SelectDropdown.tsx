import {Button, Dropdown, Text} from '@nextui-org/react';
import {useField} from 'formik';
import React from 'react';

interface OptionsProps {
  key: string;
  label: string;
}

interface SelectDropdownProps {
  options: OptionsProps[];
  name: string;
  fieldLabel?: string;
}

export const SelectDropdown = ({
  options,
  fieldLabel,
  ...props
}: SelectDropdownProps) => {
  const [field, meta, helpers] = useField(props);
  const {value} = meta;
  const {setValue} = helpers;

  const handleSelectionChange = (key: any) => {
    setValue(key, true);
  };

  return (
    <>
      {fieldLabel ? <Text>{fieldLabel}</Text> : null}
      <Dropdown>
        <Dropdown.Trigger>
          <Button bordered>{value}</Button>
        </Dropdown.Trigger>
        <Dropdown.Menu
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={value}
          onSelectionChange={handleSelectionChange}
          items={options}>
          {(item: any) => {
            return <Dropdown.Item key={item.key}>{item.label}</Dropdown.Item>;
          }}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
