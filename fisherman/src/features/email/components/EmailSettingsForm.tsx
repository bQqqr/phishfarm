import { Divider, Heading, HStack, Spinner } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Form } from 'app/components';
import {
  UpdateEmailSettingsRequest,
  useUpdateEmailSettings,
} from 'features/email';
import { emailSettingsAtom } from 'app/global';

interface Props {
  isDisabled: boolean;
}

export const EmailSettingsForm = ({ isDisabled }: Props) => {
  // Hooks
  const emailSettings = useRecoilValue(emailSettingsAtom);
  const form = useForm<UpdateEmailSettingsRequest>();
  const command = useUpdateEmailSettings();

  // Functions
  const onSubmit: SubmitHandler<UpdateEmailSettingsRequest> = async (inputs) =>
    await command(inputs);

  // Returns
  if (emailSettings)
    return (
      <>
        <Heading size="md" mt={2}>
          Configure SMTP and Display Details
        </Heading>
        <Divider my={5} />
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <HStack w="100%">
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>SMTP Host</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.smtpHost}
                {...form.register('smtpHost')}
              />
              <Form.Field.Desc>Enter the SMTP's dns or ipv4.</Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>SMTP Port</Form.Field.Label>
              <Form.Field.Number defaultValue={emailSettings.smtpPort}>
                <Form.Field.Number.Input {...form.register('smtpPort')} />
              </Form.Field.Number>
              <Form.Field.Desc>Enter SMTP port number.</Form.Field.Desc>
            </Form.Field>
          </HStack>
          <HStack w="100%">
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>SMTP Username</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.smtpUsername}
                {...form.register('smtpUsername')}
              />
              <Form.Field.Desc>
                Enter the SMTP username credential.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>SMTP Password</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.smtpPassword}
                {...form.register('smtpPassword')}
              />
              <Form.Field.Desc>
                Enter the SMTP password credential.
              </Form.Field.Desc>
            </Form.Field>
          </HStack>
          <HStack w="100%">
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>From Email</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.fromEmail}
                {...form.register('fromEmail')}
              />
              <Form.Field.Desc>Enter the From's email address.</Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>From Name</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.fromName}
                {...form.register('fromName')}
              />
              <Form.Field.Desc>Enter the From's name.</Form.Field.Desc>
            </Form.Field>
          </HStack>
          <HStack w="100%">
            <Form.Field isDisabled={isDisabled}>
              <Form.Field.Label>Subject</Form.Field.Label>
              <Form.Field.Input
                defaultValue={emailSettings.subject}
                {...form.register('subject')}
              />
              <Form.Field.Desc>
                Enter the subject of the email message.
              </Form.Field.Desc>
            </Form.Field>
            <Form.Field isDisabled={isDisabled} textAlign="left">
              <Form.Field.Checkbox
                defaultValue={emailSettings.enabledSsl.toString()}
                {...form.register('enabledSsl')}
              >
                Is SSL enabled?
              </Form.Field.Checkbox>
            </Form.Field>
          </HStack>
          <HStack>
            <Form.Button
              isDisabled={isDisabled}
              size="sm"
              variant="outline"
              colorScheme="green"
            >
              ✅ Save Email Settings
            </Form.Button>
          </HStack>
        </Form>
      </>
    );
  else return <Spinner />;
};
