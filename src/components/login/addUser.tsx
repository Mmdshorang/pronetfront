import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser } from '../../services/userRequest';


const AddUserForm = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      name: 'New User',
      email: 'new@example.com',
      password: '12345678',
    });
  };

  return <button onClick={handleSubmit}>افزودن کاربر</button>;
};
export default AddUserForm