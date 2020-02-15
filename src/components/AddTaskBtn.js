import React from 'react';
import { Button } from 'semantic-ui-react';

const AddTaskBtn = () => {
  const isLoaded = true;
  return isLoaded ? (
      <Button 
        color='red'
        content='Add a Task'
      />
    ) : (
      <Button 
        loading
        color='red'
        content='Add a Task'
      />
  )
};

export default AddTaskBtn;