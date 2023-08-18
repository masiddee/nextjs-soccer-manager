import {PreferredPosition, UserGender} from '@/graphql/generated-types';
import {Button, Input} from '@nextui-org/react';
import {Field, useFormikContext} from 'formik';
import React from 'react';
import {SelectDropdown} from './Form/SelectDropdown';

export interface PlayerInfoFormFields {
  firstName: string;
  lastName: string;
  preferredPosition: PreferredPosition;
  gender: UserGender;
  birthDate: string;
}

const PREFERRED_POSITION_OPTIONS = [
  {key: 'DEFENDER', label: 'Defender'},
  {key: 'GOALIE', label: 'Goalie'},
  {key: 'MIDFIELDER', label: 'Midfielder'},
  {key: 'STRIKER', label: 'Striker'},
  {key: 'WINGER', label: 'Winger'},
];

const GENDER_OPTIONS = [
  {key: 'MALE', label: 'Male'},
  {key: 'FEMALE', label: 'Female'},
  {key: 'OTHER', label: 'Other'},
];

export const PlayerInfoForm = () => {
  const {handleChange, values, isSubmitting, handleSubmit} =
    useFormikContext<PlayerInfoFormFields>();

  return (
    <div>
      <form>
        <Input
          aria-label="First Name"
          label="First Name"
          name="firstName"
          fullWidth
          value={values.firstName}
          onChange={handleChange}
        />
        <Input
          aria-label="Last Name"
          label="Last Name"
          name="lastName"
          fullWidth
          value={values.lastName}
          onChange={handleChange}
        />
        {/* <Input
          aria-label="Birth Date"
          label="Birth Date"
          name="birthDate"
          fullWidth
          value={values.birthDate}
          onChange={handleChange}
        /> */}
        <Field
          aria-label="Birth Date"
          label="Birth Date"
          name="birthDate"
          type="date"
          value={values.birthDate}
          onChange={handleChange}
        />
        <SelectDropdown
          options={PREFERRED_POSITION_OPTIONS}
          name="preferredPosition"
          fieldLabel="Preferred Position"
        />
        <SelectDropdown
          options={GENDER_OPTIONS}
          name="gender"
          fieldLabel="Gender"
        />
        <Button onClick={() => handleSubmit()}>Confirm Registration</Button>
      </form>
    </div>
  );
};
