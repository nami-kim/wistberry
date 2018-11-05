import { FieldProps, Field } from 'formik';
import React from 'react';
import Select, { Option, ReactSelectProps } from 'react-select';

const options = [
  { value: 'province', label: 'Province', className: 'no-display' },
  { value: 'Alberta', label: 'Alberta' },
  { value: 'British Columbia', label: 'British Columbia' },
  { value: 'New Brunswick', label: 'New Brunswick' },
  { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador' },
  { value: 'Northwest Territories', label: 'Northwest Territories' },
  { value: 'Nova Scotia', label: 'Nova Scotia' },
  { value: 'Nunavut', label: 'Nunavut' },
  { value: 'Prince Edward Island', label: 'Prince Edward Island' },
  { value: 'Quebec', label: 'Quebec' },
  { value: 'Saskatchewan', label: 'Saskatchewan' },
  { value: 'Yukon', label: 'Yukon' }
];

return <Field name="province" options={options} />;

const ProvinceSelect: React.SFC<ReactSelectProps & FieldProps> = ({
  options,
  field,
  form,
}) => (
    <Select
      options={options}
      name={field.name}
      value={field.value}
      onChange={(option: Option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
    />
  )

  export default ProvinceSelect
