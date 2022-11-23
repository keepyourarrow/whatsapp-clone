import React from 'react';

const DefaultFields = ({register, errors}) => {
  return (
    <>
      <label className="mt-5 block w-full" htmlFor="email">
        <div className="font-medium text-sm"> Email</div>

        <input
          className="mt-2 form-input w-full"
          type="email"
          id="email"
          name="email"
          ref={register({
            required: { value: true, message: "This field is required" },
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.email?.message}</span>
      </label>
      <label className="mt-5 block w-full" htmlFor="password">
        <div className="font-medium text-sm"> Password</div>
        <input
          className="mt-2 form-input w-full"
          type="password"
          id="password"
          name="password"
          ref={register({
            required: { value: true, message: "This field is required" },
            minLength: { value: 5, message: "Min characters - 5" },
          })}
        />
        <span className="mt-2 text-red-600">{errors?.password?.message}</span>
      </label>
    </>
  );
}

export default DefaultFields;