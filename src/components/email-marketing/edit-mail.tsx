'use client';

import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Loader } from '../loader';
import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
  useForm,
} from 'react-hook-form';
import { useEditEmail } from '@/hooks/email-marketing/use-marketing';
import FormGenerator from '../forms/form-generator';

interface EditEmailProps {
  id: string;
  onCreate: (data: FieldValues) => Promise<void>;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setDefault: UseFormSetValue<FieldValues>;
}

const MemoizedFormGenerator = React.memo(FormGenerator);

const EditEmailComponent: React.FC<EditEmailProps> = ({
  id,
  onCreate,
  errors: externalErrors,
  register: externalRegister,
  setDefault,
}) => {
  const { loading, template } = useEditEmail(id);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    try {
      setIsSubmitting(true);
      await onCreate(data);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (template) {
      try {
        const parsedTemplate = JSON.parse(template);
        setDefault('description', parsedTemplate);
        reset({ description: parsedTemplate });
      } catch (error) {
        console.error('Error parsing template:', error);
      }
    }
  }, [template, setDefault, reset]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader loading={true}>
          <></>
        </Loader>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <MemoizedFormGenerator
        name="description"
        register={register}
        errors={errors}
        inputType="textarea"
        type="text"
        label="Email Content"
        placeholder="Write your email content here..."
        lines={8}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Template'}
        </Button>
      </div>
    </form>
  );
};

export const EditEmail = React.memo(EditEmailComponent);
EditEmail.displayName = 'EditEmail';