import React from 'react';

import DefaultFields from './DefaultFields';

const LoginForm = ({ register, errors }) => {
  return <DefaultFields register={register} errors={errors} />;
}

export default LoginForm;