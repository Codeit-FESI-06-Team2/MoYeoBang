import {
  useForm,
  UseFormReturn,
  FieldValues,
  DefaultValues,
} from 'react-hook-form';

const useCustomForm = <T extends FieldValues>(
  defaultValues: DefaultValues<T>
) => {
  const formMethods: UseFormReturn<T> = useForm<T>({
    mode: 'onChange',
    defaultValues,
  });

  // 필드 감시 기능
  const watchFields = (fields: any) => {
    return fields.reduce((acc: any, field: any) => {
      acc[field] = formMethods.watch(field);
      return acc;
    }, {});
  };

  return { ...formMethods, watchFields };
};

export default useCustomForm;
