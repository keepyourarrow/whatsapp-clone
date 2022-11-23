import React from 'react';

import DefaultFields from './DefaultFields';

const SignUpForm = ({ register, errors }) => {
  return (
    <>
      <DefaultFields register={register} errors={errors} />
      <label className="mt-5 block w-full" htmlFor="name">
        <div className="font-medium text-sm">Username</div>
        <input
          className="mt-2 form-input w-full"
          type="text"
          id="name"
          name="name"
          ref={register({
            // to avoid empty spaces
            pattern: {
              value: /[a-zA-Z0-9&_\.-]/,
              message: "Type something",
            },
            required: { value: true, message: "This field is required" },
            minLength: { value: 5, message: "Min characters - 5" },
            maxLength: { value: 25, message: "Max characters - 25" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.name?.message}</span>
      </label>
    </>
  );
}

export default SignUpForm;